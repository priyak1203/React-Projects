import React from 'react';
import Person from './Person';

const People = ({ people, index }) => {
  return (
    <>
      {people.map((person, personIndex) => {
        let position = 'nextSlide';
        if (personIndex === index) {
          position = 'activeSlide';
        }
        if (
          personIndex === index - 1 ||
          (index === 0 && personIndex === people.length - 1)
        ) {
          position = 'lastSlide';
        }
        return <Person key={person.id} person={person} position={position} />;
      })}
    </>
  );
};

export default People;
