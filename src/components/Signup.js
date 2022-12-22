import React, { useState } from 'react';
import uniqid from 'uniqid';

function Signup() {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [passwordInput, setPasswordInput] = useState({
    password: '',
    confirm_password: '',
  });
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  function getErrors(e) {
    e.preventDefault();
    const password = passwordInput.password;
    const confirm_password = passwordInput.confirm_password;
    const body = { username, password, confirm_password };
    fetch('http://localhost:3001/user/sign-up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        setErrors(data.errors);
      });
  }

  function usernameChange(e) {
    setUsername(e.target.value);
  }

  function handlePasswordChange(e) {
    const passwordValue = e.target.value.trim();
    const passwordField = e.target.name;
    const newPassword = { ...passwordInput, [passwordField]: passwordValue };
    setPasswordInput(newPassword);
  }

  function handleValidation(e) {
    const passwordValue = e.target.value.trim();
    const passwordField = e.target.name;

    if (passwordField === 'password') {
      const uppercaseRegex = /(?=.*?[A-Z])/;
      const lowercaseRegex = /(?=.*?[a-z])/;
      const digitsRegex = /(?=.*?[0-9])/;
      const specialCharsRegex = /(?=.*?[#?!@$%^&*-])/;
      const minLengthRegex = /.{8,}/;

      const passwordLength = passwordValue.length;
      const uppercasePassword = uppercaseRegex.test(passwordValue);
      const lowercasePassword = lowercaseRegex.test(passwordValue);
      const digitsPassword = digitsRegex.test(passwordValue);
      const specialCharsPassword = specialCharsRegex.test(passwordValue);
      const minLengthPassword = minLengthRegex.test(passwordValue);

      let errMsg = '';
      if (passwordLength === 0) {
        errMsg = 'Password is empty';
      } else if (!uppercasePassword) {
        errMsg = 'Password must contain at least one uppercase character';
      } else if (!lowercasePassword) {
        errMsg = 'Password must contain at least one lowercase character';
      } else if (!digitsPassword) {
        errMsg = 'Password must contain at least one digit';
      } else if (!specialCharsPassword) {
        errMsg = 'Password must contain at least one special character';
      } else if (!minLengthPassword) {
        errMsg = 'Password must contain at least 8 characters';
      } else {
        errMsg = '';
      }
      setPasswordError(errMsg);
    }

    if (
      passwordField === 'confirm_password' ||
      (passwordField === 'password' &&
        passwordInput.confirm_password.length > 0)
    ) {
      if (passwordInput.confirm_password !== passwordInput.password) {
        setConfirmPasswordError('Confirm password does not match password');
      } else {
        setConfirmPasswordError('');
      }
    }
  }

  return (
    <div>
      <div>Sign Up</div>
      <form
        method="POST"
        action="http://localhost:3001/user/sign-up"
        onSubmit={getErrors}
      >
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={usernameChange}
            required
          ></input>
          {errors.length > 0 &&
            errors.map((error) => {
              return <div key={uniqid()}>{error.msg}</div>;
            })}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={passwordInput.password}
            onChange={handlePasswordChange}
            onKeyUp={handleValidation}
            required
          ></input>
          <div>{passwordError}</div>
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password">Confirm password:</label>
          <input
            type="password"
            name="confirm_password"
            id="confirm-password"
            value={passwordInput.confirm_password}
            onChange={handlePasswordChange}
            onKeyUp={handleValidation}
            required
          ></input>
          <div>{confirmPasswordError}</div>
        </div>
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
}

export default Signup;
