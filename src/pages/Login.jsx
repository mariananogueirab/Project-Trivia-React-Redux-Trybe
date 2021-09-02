import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Input from '../components/Input';
import { setUser } from '../actions';
/* import './login.css'; */

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      name: '',
      validEmail: false,
      validName: false,
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleEmailChange({ target }) {
    const { email } = this.state;
    const emailPath = /^[^\s@]+@[^\s@]+\.[^\s@]+$/g;

    this.setState({
      validEmail: emailPath.test(email),
      email: target.value,
    });
  }

  handleNameChange({ target }) {
    const MIN_LENGTH_PSSW = 1;
    this.setState({
      name: target.value,
      validName: target.value.length >= MIN_LENGTH_PSSW,
    });
  }

  render() {
    const { email, name, validEmail, validName } = this.state;
    return (
      <form className="form">
        <Input
          type="text"
          label="Nome:"
          value={ name }
          name="name"
          onChange={ this.handleNameChange }
          testid="input-player-name"
        />
        <Input
          type="email"
          label="E-mail:"
          value={ email }
          name="email"
          onChange={ this.handleEmailChange }
          testid="input-gravatar-email"
        />

        <button
          type="button"
          /*       onClick={ this.onSubmmitClick } */
          disabled={ !validEmail || !validName }
          data-testid="btn-play"
        >
          Jogar
        </button>
      </form>
    );
  }
}

/* Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.string).isRequired,
  getEmail: PropTypes.func.isRequired,
}; */

/* const mapDispatchToProps = (dispatch) => ({
  getEmail: (payload) => dispatch(setUser(payload)),
}); */

/* export default connect(null, mapDispatchToProps)(Login); */

export default Login;
