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
    const { token } = this.props;
    const inState = {
      player: {
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
    return (
      <>
        <div>Game</div>
        <Timer />
        <Header />
        <Questions />
      </>
    );
  }
}

Game.propTypes = {
  token: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.user.token,
});

export default connect(mapStateToProps)(Game);
