import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { isOver } from '../actions/index';

class Timer extends Component {
  constructor() {
    super();

    this.state = {
      time: 30,
    };

    this.timer = this.timer.bind(this);
  }

  componentDidMount() {
    this.timer();
  }

  componentDidUpdate() {
    const { over } = this.props;
    if (!over) return this.over();
  }

  timer() {
    const oneSecond = 1000;
    setInterval(
      () => this.setState(
        (prevState) => ({ time: prevState.time > 0 ? prevState.time - 1 : 0 }),
      ), oneSecond,
    );
  }

  over() {
    const { time } = this.state;
    const { timeIsOver } = this.props;
    if (time === 0) {
      return timeIsOver();
    }
  }

  render() {
    const { time } = this.state;
    return (
      <p>
        {time}
      </p>
    );
  }
}

Timer.propTypes = {
  timeIsOver: PropTypes.func.isRequired,
  over: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  over: state.user.over,
});

const mapDispatchToProps = (dispatch) => ({
  timeIsOver: () => dispatch(isOver()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
