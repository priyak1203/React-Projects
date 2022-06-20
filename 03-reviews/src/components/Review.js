import React, { useState } from 'react';
import { FaQuoteRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import people from '../utils/data';

const Review = () => {
  const [index, setIndex] = useState(0);
  const { id, name, job, image, text } = people[index];

  // Check range of the index
  const checkNumber = (number) => {
    if (number < 0) {
      return people.length - 1;
    }
    if (number > people.length - 1) {
      return 0;
    }
    return number;
  };

  // previous person
  const prevPerson = () => {
    setIndex((index) => {
      return checkNumber(index - 1);
    });
  };

  // next person
  const nextPerson = () => {
    setIndex((index) => {
      return checkNumber(index + 1);
    });
  };

  // random person
  const randomPerson = () => {
    let randomIndex = Math.floor(Math.random() * people.length);
    if (randomIndex === index) {
      randomIndex = index + 1;
    }
    setIndex(checkNumber(randomIndex));
  };

  return (
    <article className="review">
      <div className="img-container">
        <img src={image} alt={name} className="person-img" />
        <span className="quote-icon">
          <FaQuoteRight />
        </span>
      </div>
      <h4 className="author">{name}</h4>
      <p className="job">{job}</p>
      <p className="info">{text}</p>
      <div>
        <button className="prev-btn" onClick={prevPerson}>
          <FaChevronLeft />
        </button>
        <button className="next-btn" onClick={nextPerson}>
          <FaChevronRight />
        </button>
      </div>
      <button className="random-btn" onClick={randomPerson}>
        surprise me
      </button>
    </article>
  );
};

export default Review;
