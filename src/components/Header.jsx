import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { getRanking } from '../actions';

class Header extends React.Component {
  render() {
    const { name, email, getRankingObj } = this.props;
    const gravatar = md5(email.toLowerCase().trim()).toString();
    const srcImage = `https://www.gravatar.com/avatar/${gravatar}`;
    const score = 0;
    const ranking = { name, score, picture: srcImage };
    getRankingObj(ranking);

    return (
      <header>
        <img scr={ srcImage } alt="gravatar" data-testid="header-profile-picture" />
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
