import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div>
      <div>Log In</div>
      <form method="POST" action="http://localhost:3001/user/log-in">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" name="username" id="username" required></input>
        </div>
        <div className="form-group">
          <label htmlFor="password">Username:</label>
          <input type="text" name="password" id="password" required></input>
        </div>
        <div>
          Don't have an account yet? Create one{' '}
          <Link to="/user/sign-up">here</Link>.
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default Login;
