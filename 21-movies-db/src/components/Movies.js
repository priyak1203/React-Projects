import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context';
const defaultPoster =
  'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png';

const Movies = () => {
  const { isLoading, movies } = useGlobalContext();

  return (
    <>
      {isLoading ? (
        <div className="loading"></div>
      ) : (
        <section className="movies">
          {movies.map((movie) => {
            const {
              imdbID: id,
              Poster: poster,
              Title: title,
              Year: year,
            } = movie;
            return (
              <Link to={`movies/${id}`} key={id} className="movie">
                <article>
                  <img
                    src={poster === 'N/A' ? defaultPoster : poster}
                    alt={title}
                  />
                  <div className="movie-info">
                    <h4>{title}</h4>
                    <p>{year}</p>
                  </div>
                </article>
              </Link>
            );
          })}
        </section>
      )}
    </>
  );
};

export default Movies;
