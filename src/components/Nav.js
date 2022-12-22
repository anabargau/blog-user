import React from 'react';
import { Link } from 'react-router-dom';

function Nav(props) {
  const { user } = props;
  return (
    <div>
      <div>Best Blog</div>
      <Link to="/">Home</Link>
      {!user ? (
        <Link to="/user/log-in">Log In</Link>
      ) : (
        <form method="POST" action="http://localhost:3001/user/log-out">
          <input type="hidden"> </input>
          <button type="submit">Log Out</button>
        </form>
      )}
    </div>
  );
}

export default Nav;
