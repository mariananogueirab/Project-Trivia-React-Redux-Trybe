import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '../components/Button';
import '../css/ranking.css';

class Ranking extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { ranking } = this.props;
    return (
      <div className="ranking">
        <h1 data-testid="ranking-title">Ranking</h1>
        <ul>
          {ranking.sort((a, b) => b.score - a.score)
            .map(({ name, score, picture }, index) => (
              <li key={ name } className="container">
                <div>
                  <img src={ picture } alt={ name } />
                </div>
                <div data-testid={ `player-name-${index}` }>{name}</div>
                <div data-testid={ `player-score-${index}` }>{score}</div>
              </li>
            ))}
        </ul>
        <Button
          id="btn-go-home"
          onClick={ this.handleClick }
          label="Jogar Novamente"
        />

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ranking: state.user.ranking,
});

Ranking.propTypes = {
  ranking: PropTypes.arrayOf(PropTypes.objectOf({
    name: PropTypes.string.isRequired,
    score: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  })).isRequired,
  history: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps)(Ranking);
