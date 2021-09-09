import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Ranking extends Component {
  render() {
    const { ranking } = this.props;
    return (
      <div className="ranking">
        <h1 data-testid="ranking-title">Ranking</h1>
        <ul>
          {ranking.sort((a, b) => b.score - a.score)
            .map(({ name, score, picture }, index) => (
              <li key={ name }>
                <span data-testid={ `player-name-${index}` }>{name}</span>
                <img src={ picture } alt={ name } />
                <span data-testid={ `player-score-${index}` }>{score}</span>
              </li>
            ))}
        </ul>
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
};

export default connect(mapStateToProps)(Ranking);
