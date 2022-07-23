import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { API_ENDPOINT } from '../context';
const defaultPoster =
  'https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png';

const SingleMovie = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState({ show: false, msg: '' });

  const fetchData = async (url) => {
    setIsLoading(true);

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      if (data.Response === 'False') {
        setError({ show: true, msg: data.Error });
        setIsLoading(false);
      } else {
        setMovie(data);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(`${API_ENDPOINT}&i=${id}`);
  }, [id]);

  if (isLoading) {
    return <div className="loading"></div>;
  }

  if (error.show) {
    return (
      <div className="page-error">
        <h2>{error.msg}</h2>
        <Link to="/" className="btn">
          back to movies
        </Link>
      </div>
    );
  }

  const { Plot: plot, Poster: poster, Title: title, Year: year } = movie;
  return (
    <section className="single-movie">
      <img src={poster === 'N/A' ? defaultPoster : poster} alt={title} />
      <div>
        <h2>{title}</h2>
        <p>{plot}</p>
        <h4>{year}</h4>
        <Link to="/" className="btn">
          back to movies
        </Link>
      </div>
    </section>
  );
};

export default SingleMovie;
