import React, {useNavigate} from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return <div>
    <p>Sorry, it seems you're looking for something that doesn't exist...</p>
    <Link to="/">🎵 Take me home, to the place I belong 🎵</Link>
  </div>;
};

export default NotFound;
