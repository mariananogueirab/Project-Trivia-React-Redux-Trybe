import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Questions from '../components/Questions';
import Timer from '../components/Timer';
import Header from '../components/Header';

class Game extends Component {
  constructor(props) {
    super(props);

    this.getTokenToState = this.getTokenToState.bind(this);
  }

  getTokenToState() {
    const { token, player } = this.props;
    const inState = {
      player: {
        ...player,
        score: 0,
        assertions: 0,
      },
      token,
    };
    localStorage.setItem('token', token);
    localStorage.setItem('state', JSON.stringify(inState));
  }

  render() {
    this.getTokenToState();
    const { history } = this.props;
    return (
      <>
        <div>Game</div>
        <Timer />
        <Header />
        <Questions history={ history } />
      </>
    );
  }
}

Game.propTypes = {
  token: PropTypes.string.isRequired,
  player: PropTypes.string.isRequired,
  history: PropTypes.objectOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  token: state.user.token,
  player: state.user.player,
});

export default connect(mapStateToProps)(Game);
