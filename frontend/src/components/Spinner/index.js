import React from 'react';

import './spinner.css';

const Spinner = () => {
  return (
    <div className="spinner-wrapper">
      <div className="spinner-loader">
        <span className="loader-Span" />
        <span className="loader-Span" />
        <span className="loader-Span" />
        <span className="loader-Span" />
        <span className="loader-Span" />
        <span className="loader-Span" />
        <span className="loader-Span" />
        <span className="loader-Span" />
        <span className="loader-Span" />
      </div>
    </div>
  );
};

export default Spinner;
