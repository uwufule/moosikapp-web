import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import uuidv4 from 'uuid/v4';
import { Link, withRouter } from 'react-router-dom';
import Form from './Form';
import { login as loginAction } from '../../actions/login';

import css from './css/Form.module.css';

const LoginForm = ({ token, login, history }) => {
  useEffect(() => {
    if (token) {
      history.push('/');
    }
  });

  const uuids = {
    username: uuidv4(),
    password: uuidv4(),
  };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Form
      title="Login"
      body={(
        <>
          <div>
            <label htmlFor={uuids.username} className={css.label}>
              <input
                id={uuids.username}
                type="text"
                placeholder="Username"
                className={css.input}
                onInput={event => setUsername(event.target.value)}
              />
            </label>
            <label htmlFor={uuids.password} className={css.label}>
              <input
                id={uuids.password}
                type="password"
                placeholder="Password"
                className={css.input}
                onInput={event => setPassword(event.target.value)}
              />
            </label>
          </div>
          <div className={classnames(css.footer, css.spaceBetween)}>
            <Link to="/forgot" className={css.link}>Forgot your password?</Link>
            <div>
              <Link to="/register" className={css.link}>Need an account?</Link>
              <input type="submit" value="Login" className={css.submit} />
            </div>
          </div>
        </>
      )}
      onSubmit={(event) => {
        event.preventDefault();
        login(username, password);
      }}
    />
  );
};

LoginForm.propTypes = {
  token: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = store => ({
  token: store.login.token,
});

const mapDispatchToProps = dispatch => ({
  login: () => dispatch(loginAction()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));
