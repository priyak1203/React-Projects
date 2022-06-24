import React, { useEffect, useState } from 'react';
import Jobs from './components/Jobs';
import Loading from './components/Loading';

const url = 'https://course-api.com/react-tabs-project';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setJobs(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return <main>{isLoading ? <Loading /> : <Jobs jobs={jobs} />}</main>;
}

export default App;
