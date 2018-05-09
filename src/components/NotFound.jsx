import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = props => (
  <div className="not-found container">
    {'Page not found. You can go to '}
    <Link to="/">
      {'Studios'}
    </Link>
    {' page'}
  </div>
);

export default NotFound;
