import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const List = ({ items, removeItem, editItem }) => {
  return (
    <section>
      {items.map((item) => {
        const { id, title } = item;
        return (
          <article className="grocery-item" key={id}>
            <p className="title">{title}</p>
            <div className="btn-container">
              <button
                className="edit-btn"
                type="button"
                onClick={() => editItem(id)}
              >
                <FaEdit />
              </button>
              <button
                className="delete-btn"
                type="button"
                onClick={() => removeItem(id)}
              >
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default List;
