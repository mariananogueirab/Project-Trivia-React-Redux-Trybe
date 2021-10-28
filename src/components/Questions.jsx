import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getQuestions } from '../services/api';
import { getRanking, updateScore } from '../actions';
import Button from './Button';
import '../css/game.css';

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      currentQuestionIndex: 0,
      loading: true,
      answered: false,
    };

    this.getQuestionsFromAPI = this.getQuestionsFromAPI.bind(this);
    this.getSortedButtons = this.getSortedButtons.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.getRankingLocalStorage = this.getRankingLocalStorage.bind(this);
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
      <Button
        key={ currentQuestion.correct_answer }
        disabled={ answered || over }
        id="correct-answer"
        style={ answered ? { border: '3px solid rgb(6, 240, 15)' } : {} }
        onClick={ this.handleClick }
        name="correct"
        label={ currentQuestion.correct_answer }
      />,
      currentQuestion.incorrect_answers.map((answer, i) => (
        <Button
          key={ answer }
          disabled={ answered || over }
          id={ `wrong-answer-${i}` }
          style={ answered ? { border: '3px solid rgb(255, 0, 0)' } : {} }
          onClick={ this.handleClick }
          name="incorrect"
          label={ answer }
        />
      )),
    ];

    const fator = 0.5;
    const sortedButtons = buttons.sort(() => Math.random() - fator);
    return sortedButtons;
  }

  getRankingLocalStorage() {
    const state = JSON.parse(localStorage.getItem('state'));
    const { name, score, picture } = state.player;
    const rankingPlayer = {
      name,
      score,
      picture,
    };
    const { ranking } = this.props;
    ranking(rankingPlayer);
  }

  nextQuestion() {
    this.setState((prevstate) => (
      { currentQuestionIndex: prevstate.currentQuestionIndex + 1, answered: false }));
    const { currentQuestionIndex } = this.state;
    const INDEX_LAST_QUESTION = 4;
    if (currentQuestionIndex === INDEX_LAST_QUESTION) {
      const { history } = this.props;
      history.push('/feedback');
      this.getRankingLocalStorage();
    }
  }

  handleClick(event) {
    const { questions, currentQuestionIndex } = this.state;
    const currentQuestion = questions[currentQuestionIndex];
    const { difficulty } = currentQuestion;
    const defaultPoint = 10;
    const { time } = this.props;
    const difficultyPoints = {
      hard: 3,
      medium: 2,
      easy: 1,
    };
    if (event.target.name === 'correct') {
      const state = JSON.parse(localStorage.getItem('state'));
      const newScore = state.player.score
      + defaultPoint + (time * difficultyPoints[difficulty]);
      const { getScore } = this.props;
      getScore(newScore);
      const newState = {
        ...state,
        player: {
          ...state.player,
          name: state.player.name,
          score: newScore,
          assertions: state.player.assertions + 1,
        },
      };
      localStorage.setItem('state', JSON.stringify(newState));
    }
    this.setState({ answered: true });
  }

  render() {
    const { loading } = this.state;

    if (loading) {
      return <span>Loading...</span>;
    }

    const { questions, currentQuestionIndex, answered } = this.state;
    const currentQuestion = questions[currentQuestionIndex];
    const { over } = this.props;
    return (
      <div className="questions-card">
        <section>
          <h2 data-testid="question-category">{currentQuestion.category}</h2>
          <p data-testid="question-text">{currentQuestion.question}</p>
        </section>
        <section className="answered">
          {this.getSortedButtons()}
          <br />
        </section>
        { (answered || over)
        && (
          <Button
            id="btn-next"
            onClick={ this.nextQuestion }
            label="Próxima"
          />
        )}
      </div>
    );
  }
}

Questions.propTypes = {
  over: PropTypes.bool.isRequired,
  time: PropTypes.number.isRequired,
  history: PropTypes.objectOf(PropTypes.string).isRequired,
  ranking: PropTypes.arrayOf(PropTypes.objectOf({
    name: PropTypes.string.isRequired,
    score: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  })).isRequired,
  getScore: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  over: state.user.over,
  email: state.user.email,
  time: state.user.time,
  score: state.user.score,
  assertions: state.user.assertions,
});

const mapDispatchToProps = (dispatch) => ({
  ranking: (payload) => dispatch(getRanking(payload)),
  getScore: (payload) => dispatch(updateScore(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
