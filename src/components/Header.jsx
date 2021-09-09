import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { getRanking } from '../actions';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
    };
    this.setPlayerState = this.setPlayerState.bind(this);
  }

  componentDidMount() {
    this.setPlayerState();
  }

  setPlayerState() {
    const state = JSON.parse(localStorage.getItem('state'));
    console.log(state.player.score);
    this.setState({
      score: state.player.score,
    });
  }

  render() {
    const { name, email, getRankingObj } = this.props;
    const gravatar = email ? md5(email.toLowerCase().trim()).toString() : '';
    const srcImage = `https://www.gravatar.com/avatar/${gravatar}`;
    const { score } = this.state;
    const ranking = { name, score, picture: srcImage };
    getRankingObj(ranking);

    return (
      <header>
        <img src={ srcImage } alt="gravatar" data-testid="header-profile-picture" />
        <p data-testid="header-player-name">{`Jogador: ${name}`}</p>
        <p data-testid="header-score">{`Ponto: ${score}`}</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.player.gravatarEmail,
  name: state.user.player.name,
});

const mapDispatchToProps = (dispatch) => ({
  getRankingObj: (payload) => dispatch(getRanking(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

Header.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  getRankingObj: PropTypes.func,
}.isRequired;
