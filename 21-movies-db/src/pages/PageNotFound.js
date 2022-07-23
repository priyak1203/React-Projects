import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className="page-error">
      <h2>Error 404!!! Page Not Found</h2>
      <Link to="/" className="btn">
        back to movies
      </Link>
    </div>
  );
};

export default PageNotFound;
