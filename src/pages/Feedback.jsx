import React from 'react';

class Feedback extends React.Component {
  render() {
    const { player: { assertions, score } } = JSON.parse(localStorage.getItem('state'));
    const minAssertions = 3;
    return (
      <div>
        <h1 data-testid="feedback-text">
          { assertions < minAssertions ? 'Podia ser melhor...' : 'Mandou bem!'}
        </h1>
        <p>
          O total de respostas certas foi:
          <span data-testid="feedback-total-question">{ assertions }</span>
        </p>
        <p>
          Seu score final é:
          <span data-testid="feedback-total-score">{ score }</span>
        </p>
      </div>
    );
  }
}

export default Feedback;
