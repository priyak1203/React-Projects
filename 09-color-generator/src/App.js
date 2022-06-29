import React, { useState } from 'react';
import Values from 'values.js';
import SingleColor from './components/SingleColor';

function App() {
  const [color, setColor] = useState('');
  const [colorList, setColorList] = useState(new Values('#a865c9').all(10));
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const newColors = new Values(color).all(10);
      setColorList(newColors);
      setError(false);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  return (
    <main>
      <section className="container">
        <h3>color generator</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="#a865c9"
            className={`${error ? 'error' : ''}`}
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
          <button className="btn" type="submit">
            Generate
          </button>
        </form>
      </section>
      <section className="colors">
        {colorList.map((colorItem, index) => {
          return (
            <SingleColor
              key={index}
              hexColor={colorItem.hex}
              index={index}
              {...colorItem}
            />
          );
        })}
      </section>
    </main>
  );
}

export default App;
