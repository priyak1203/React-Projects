import { useEffect, useRef, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Photo from './components/Photo';

const mainUrl = 'https://api.unsplash.com/photos/';
const searchUrl = 'https://api.unsplash.com/search/photos/';
const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;

function App() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [newImages, setNewImages] = useState(false);
  const mounted = useRef(false);

  const fetchImages = async () => {
    setLoading(true);
    let url;
    const urlPage = `&page=${page}`;
    const urlQuery = `&query=${query}`;

    if (query) {
      url = `${searchUrl}${clientID}${urlPage}${urlQuery}`;
    } else {
      url = `${mainUrl}${clientID}${urlPage}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      setPhotos((oldPhotos) => {
        if (query && page === 1) {
          return data.results;
        } else if (query) {
          return [...oldPhotos, ...data.results];
        } else {
          return [...oldPhotos, ...data];
        }
      });

      setNewImages(false);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setNewImages(false);
      setLoading(false);
    }
  };

  // fetch images on initial render and  everytime the page value changes
  useEffect(() => {
    fetchImages();
  }, [page]);

  // run everytime the newImages value is true which indicates need to fetch new images
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true; // do not run on first render
      return;
    }

    if (loading) return; // exit if loading
    if (!newImages) return; // exit if newImages is false

    setPage((oldPage) => {
      return oldPage + 1;
    });
  }, [newImages]);

  // to check if the end of the page has reached
  const scrollEvent = () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
      setNewImages(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollEvent);

    return () => window.removeEventListener('scroll', scrollEvent);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query) return;
    if (page === 1) {
      fetchImages();
      return;
    }
    setPage(1);
  };

  return (
    <main>
      <section className="search">
        <form className="search-form">
          <input
            type="text"
            placeholder="search"
            className="form-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="submit-btn" onClick={handleSubmit}>
            <FaSearch />
          </button>
        </form>
      </section>
      <section className="photos">
        <div className="photos-center">
          {photos.length < 1
            ? !loading && (
                <div className="btn-container">
                  <h2>No Photos to show</h2>
                  <button className="btn" onClick={() => location.reload()}>
                    Refresh
                  </button>
                </div>
              )
            : photos.map((image, index) => {
                return <Photo key={index} {...image} />;
              })}
        </div>
        {loading && <h2 className="loading">Loading...</h2>}
      </section>
    </main>
  );
}

export default App;
