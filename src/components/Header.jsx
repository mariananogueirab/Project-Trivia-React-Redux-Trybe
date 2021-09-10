import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Timer from './Timer';
import '../css/game.css';

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
    this.setState({
      score: state.player.score,
    });
  }

  render() {
    const { name, gravatarImage } = this.props;
    const { score } = this.state;
    return (
      <header>
        <div className="container">
          <img
            src={ gravatarImage }
            alt="gravatar"
            data-testid="header-profile-picture"
          />
        </div>
        <div
          data-testid="header-player-name"
          className="container"
        >
          {`Jogador: ${name}`}
        </div>
        <div data-testid="header-score" className="container">{`Pontos: ${score}`}</div>
        <Timer />
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.player.gravatarEmail,
  name: state.user.player.name,
  gravatarImage: state.user.picture,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  gravatarImage: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
