import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
/* import getGravatarThunk from '../actions'; */

class Header extends React.Component {

  /* gravatarFunction() {

  } */

  render() {
    const { name, email } = this.props;
    console.log(email)
    const gravatar = md5(email.toLowerCase().trim()).toString();
    console.log(gravatar);

    return (
      <header>
        <img scr={ `https://www.gravatar.com/avatar/${gravatar}` } alt="gravatar" data-testid="header-profile-picture" />
        <p data-testid="header-player-name">{`Jogador: ${name}`}</p>
        <p data-testid="header-score">Ponto: 0</p>
      </header>
    );
  }
}

/* const mapDispatchToProps = (dispatch) => ({
  getGravatar: (hash) => dispatch(getGravatarThunk(hash)),
}); */

const mapStateToProps = (state) => ({
  email: state.user.player.gravatarEmail,
  name: state.user.player.name,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
}.isRequired;
