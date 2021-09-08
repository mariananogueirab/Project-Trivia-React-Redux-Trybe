import React from 'react';

class Feedback extends React.Component {
  render() {
    const { player: { assertions } } = JSON.parse(localStorage.getItem('state'));
    const minAssertions = 3;
    return (
      <div>
        <h1 data-testid="feedback-text">
          { assertions < minAssertions ? 'Podia ser melhor...' : 'Mandou bem!'}
        </h1>
      </div>
    );
  }
}

export default Feedback;
