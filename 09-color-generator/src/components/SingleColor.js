import React, { useEffect, useState } from 'react';
import rgbToHex from '../utils';

const SingleColor = ({ rgb, weight, hexColor, index }) => {
  const [alert, setAlert] = useState(false);
  const bgColor = rgb.join(',');
  const hexValue = `#${hexColor}`;
  const rgbHexValue = rgbToHex(...rgb);

  useEffect(() => {
    const alertTimeOut = setTimeout(() => {
      setAlert(false);
    }, 3000);

    return () => clearTimeout(alertTimeOut);
  }, [alert]);

  return (
    <article
      className={`color ${index > 10 ? 'color-light' : ''}`}
      style={{ backgroundColor: `rgb(${bgColor}` }}
      onClick={() => {
        navigator.clipboard.writeText(hexValue);
        setAlert(true);
      }}
    >
      <p className="percent-value">{weight}%</p>
      <p className="color-value">{rgbHexValue}</p>
      {alert && <p className="alert">copied to clipboard</p>}
    </article>
  );
};

export default SingleColor;
