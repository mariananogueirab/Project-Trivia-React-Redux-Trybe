import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Questions from '../components/Questions';
import Header from '../components/Header';
import setGravatarImage from '../services/utils';
import { getGravatarImage } from '../actions';
import '../css/game.css';

class Game extends Component {
  constructor(props) {
    super(props);

    this.getTokenToState = this.getTokenToState.bind(this);
  }

  componentDidMount() {
    const { player: { email }, gravatarImage } = this.props;
    const srcImage = setGravatarImage(email);
    gravatarImage(srcImage);
  }

  getTokenToState() {
    const { token, player } = this.props;
    const inState = {
      player: {
        ...player,
        score: 0,
        assertions: 0,
        picture: setGravatarImage(player.email),
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
        <h1>Game</h1>
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
  gravatarImage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.user.token,
  player: state.user.player,
});

const mapDispatchToProps = (dispatch) => ({
  gravatarImage: (payload) => dispatch(getGravatarImage(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
