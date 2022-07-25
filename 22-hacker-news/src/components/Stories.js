import React from 'react';
import { useGlobalContext } from '../context';

const Stories = () => {
  const { isLoading, stories, removeStory } = useGlobalContext();

  return (
    <>
      {isLoading ? (
        <div className="loading"></div>
      ) : (
        <section className="stories">
          {stories.map((story) => {
            const {
              author,
              objectID: id,
              num_comments: comments,
              points,
              title,
              url,
            } = story;
            return (
              <article key={id} className="story">
                <h4 className="title">{title}</h4>
                <p className="info">
                  {points} points by
                  <span>{author} | </span> {comments} comments
                </p>
                <div>
                  <a
                    href={url}
                    target="_blank"
                    className="read-link"
                    rel="noopener noreferrer"
                  >
                    read more
                  </a>
                  <button
                    className="remove-btn"
                    onClick={() => removeStory(id)}
                  >
                    remove
                  </button>
                </div>
              </article>
            );
          })}
        </section>
      )}
    </>
  );
};

export default Stories;
