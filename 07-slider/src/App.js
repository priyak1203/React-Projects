import React, { useEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import People from './components/People';
import data from './utils/data';

function App() {
  const [people, setPeople] = useState(data);
  const [index, setIndex] = useState(0);

  // To check the index range
  useEffect(() => {
    const lastIndex = people.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, people]);

  // for auto slider effect
  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 5000);

    return () => {
      clearInterval(slider);
    };
  }, [index]);

  return (
    <main>
      <section className="section">
        <div className="title">
          <h2>
            <span>/</span> Reviews
          </h2>
        </div>
        <div className="section-center">
          <People people={people} index={index} />

          <button className="prev" onClick={() => setIndex(index - 1)}>
            <FiChevronLeft />
          </button>
          <button className="next" onClick={() => setIndex(index + 1)}>
            <FiChevronRight />
          </button>
        </div>
      </section>
    </main>
  );
}

export default App;
