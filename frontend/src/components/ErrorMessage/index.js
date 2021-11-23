import React from 'react';
import './error.css';

export default function ErrorMessage({ msg }) {
  return msg ? <div className="error-message">{msg}</div> : <React.Fragment />;
}
