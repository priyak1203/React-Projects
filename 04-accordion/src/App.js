import React from 'react';
import Question from './components/Question';
import questions from './utils/data';

function App() {
  return (
    <main>
      <div className="container">
        <h3>Questions and answers about Login </h3>
        <section className="info">
          {questions.map((question) => {
            return <Question key={question.id} {...question} />;
          })}
        </section>
      </div>
    </main>
  );
}

export default App;
