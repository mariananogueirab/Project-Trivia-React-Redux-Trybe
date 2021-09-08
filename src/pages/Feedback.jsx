import React from 'react';
import HeaderFeedback from '../components/HeaderFeedback';

class Feedback extends React.Component {
  render() {
    return (
      <div>
        <HeaderFeedback />
        <h1 data-testid="feedback-text">Feedback</h1>
      </div>
    );
  }
}

export default Feedback;
