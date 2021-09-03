import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getQuestions } from '../services/api';

class Questions extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      currentQuestionIndex: 0,
      loading: true,
      answered: false,
    };

    this.getQuestionsFromAPI = this.getQuestionsFromAPI.bind(this);
    this.getSortedButtons = this.getSortedButtons.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.getQuestionsFromAPI();
  }

  async getQuestionsFromAPI() {
    this.setState({ loading: true });
    const token = localStorage.getItem('token');

    const questions = await getQuestions(token);
    this.setState({ questions, loading: false });
  }

  getSortedButtons() {
    const { questions, currentQuestionIndex, answered } = this.state;
    const { over } = this.props;
    const currentQuestion = questions[currentQuestionIndex];

    const buttons = [
      <button
        key={ currentQuestion.correct_answer }
        type="button"
        disabled={ answered || over }
        data-testid="correct-answer"
        style={ answered ? { border: '3px solid rgb(6, 240, 15)' } : {} }
        onClick={ this.handleClick }
      >
        {currentQuestion.correct_answer}
      </button>,
      currentQuestion.incorrect_answers.map((answer, i) => (
        <button
          key={ answer }
          type="button"
          disabled={ answered || over }
          data-testid={ `wrong-answer-${i}` }
          style={ answered ? { border: '3px solid rgb(255, 0, 0)' } : {} }
          onClick={ this.handleClick }
        >
          {answer}
        </button>
      )),
    ];

    const fator = 0.5;
    const sortedButtons = buttons.sort(() => Math.random() - fator);
    return sortedButtons;
  }

  handleClick() {
    this.setState({ answered: true });
  }

  render() {
    const { loading } = this.state;

    if (loading) {
      return <span>Loading...</span>;
    }

    const { questions, currentQuestionIndex } = this.state;
    const currentQuestion = questions[currentQuestionIndex];
    return (
      <div>
        <section>
          <h2 data-testid="question-category">{currentQuestion.category}</h2>
          <p data-testid="question-text">{currentQuestion.question}</p>
        </section>
        <section className="answere">
          {this.getSortedButtons()}
          <br />
          <button type="button">PRÓXIMA</button>
        </section>
      </div>
    );
  }
}

Questions.propTypes = {
  over: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  over: state.user.over,
});

export default connect(mapStateToProps)(Questions);
