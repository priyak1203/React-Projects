import React, { useEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import People from './components/People';
import data from './utils/data';

function App() {
  const [people, setPeople] = useState(data);
  const [index, setIndex] = useState(0);

  //   useEffect(() => {
  //     const lastIndex = people.length - 1;
  //     if (index < 0) {
  //       setIndex(lastIndex);
  //     }
  //     if (index > lastIndex) {
  //       setIndex(0);
  //     }
  //   }, [index, people]);

  const prevSlide = () => {
    setIndex((oldIndex) => {
      let index = oldIndex - 1;
      if (index < 0) {
        index = people.length - 1;
      }
      return index;
    });
  };

  const nextSlide = () => {
    setIndex((oldIndex) => {
      let index = oldIndex + 1;
      if (index > people.length - 1) {
        index = 0;
      }
      return index;
    });
  };

  // for auto slider effect
  useEffect(() => {
    let slider = setInterval(() => {
      setIndex((oldIndex) => {
        let index = oldIndex + 1;
        if (index > people.length - 1) {
          index = 0;
        }
        return index;
      });
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
            <span>/</span> Reviews - A
          </h2>
        </div>
        <div className="section-center">
          <People people={people} index={index} />

          <button className="prev" onClick={prevSlide}>
            <FiChevronLeft />
          </button>
          <button className="next" onClick={nextSlide}>
            <FiChevronRight />
          </button>
        </div>
      </section>
    </main>
  );
}

export default App;
