import React from 'react';
import PropTypes from 'prop-types';
import '../css/button.css';

class Button extends React.Component {
  render() {
    const { onClick, id, label, disabled, key, style, name } = this.props;
    return (
      <button
        type="button"
        data-testid={ id }
        onClick={ onClick }
        disabled={ disabled }
        key={ key }
        style={ style }
        name={ name }
      >
        {label}
      </button>
    );
  }
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  key: PropTypes.string.isRequired,
  style: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Button;
