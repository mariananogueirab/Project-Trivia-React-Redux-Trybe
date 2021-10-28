import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../css/game.css';

class HeaderFeedback extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player: { name: '', gravatarEmail: '', score: 0 },
    };
    this.setPlayerState = this.setPlayerState.bind(this);
  }

  componentDidMount() {
    this.setPlayerState();
  }

  setPlayerState() {
    const state = JSON.parse(localStorage.getItem('state'));
    if (state) {
      this.setState({
        player: state.player,
      });
    }
  }

  render() {
    const { player: { name, score } } = this.state;
    const { gravatarPicture } = this.props;

    return (
      <header>
        <img
          src={ gravatarPicture }
          alt="gravatar"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{`Jogador: ${name}`}</p>
        <p>Ponto: </p>
        <p data-testid="header-score">{score}</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  gravatarPicture: state.user.picture,
});

HeaderFeedback.propTypes = {
  gravatarPicture: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(HeaderFeedback);
