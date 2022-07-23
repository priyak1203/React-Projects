import { useEffect, useState } from 'react';
const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIES_DB_KEY}`;

const useFetch = (urlParams) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState({ show: false, msg: '' });

  const fetchData = async (url) => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.Response === 'True') {
        setData(data.Search || data);
        setError({ show: false, msg: '' });
      } else {
        setError({ show: true, msg: data.Error });
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(`${API_ENDPOINT}${urlParams}`);
  }, [urlParams]);

  return { isLoading, data, error };
};

export default useFetch;
