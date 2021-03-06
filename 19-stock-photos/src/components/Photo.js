import React from 'react';

const Photo = ({
  likes,
  urls: { regular: imageUrl },
  user: {
    name,
    portfolio_url,
    profile_image: { medium: userImage },
  },
}) => {
  return (
    <article className="photo">
      <img src={imageUrl} alt={name} />
      <div className="photo-info">
        <div>
          <h4>{name}</h4>
          <p>{likes} likes</p>
        </div>
        <a href={portfolio_url}>
          <img src={userImage} alt={name} className="user-img" />
        </a>
      </div>
    </article>
  );
};

export default Photo;
