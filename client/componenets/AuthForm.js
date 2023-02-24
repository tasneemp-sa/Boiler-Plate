import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {authenticate, getLogin, getLogout, getSignup, setLogin, setLogout, setSignup} from '../reducers/index.js'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signup = useSelector(getSignup);
  console.log('signup ', signup);
  const login = useSelector(getLogin);
  console.log('login ', login);
  // const {name, displayName, handleSubmit, error} = props
  const logout = useSelector(getLogout);

  async function handleSubmit(evt) {
    evt.preventDefault();
    const method = evt.target.name;
    console.log('formName', method);
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    await dispatch(authenticate({username, password, method}));
    evt.target.username.value = "";
    evt.target.password.value = "";
    console.log('token on method', method, ' ', window.localStorage.getItem("token"))
    if ((window.localStorage.getItem("token") !== null) && method === "login") {
      // dispatch(setLogout());
      navigate('/posts');
    }

    else if (method === "signup") {
      dispatch(setLogin());
    }
  }

  async function handleLogin () {
    await dispatch(setLogin());
  }

  async function handleSignUp () {
    await dispatch(setSignup());
  }

  useEffect(() => {
    window.localStorage.removeItem('token');
  },[])

  return (
    <div>
      <form onSubmit={handleSubmit} name={login !== "" ? "login" : "signup"}>
        <div>
          <label htmlFor="username">
            <small>Username</small>
          </label>
          <input name="username" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit" onClick={handleLogin}>Login</button>
          <button type="submit" onClick={handleSignUp}>Sign Up</button>
        </div>
        {/* {error && error.response && <div> {error.response.data} </div>} */}
      </form>
      <div>
      </div>
    </div>
  )
}

export default AuthForm;

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
// const mapLogin = state => {
//   return {
//     name: 'login',
//     displayName: 'Login',
//     error: state.auth.error
//   }
// }

// const mapSignup = state => {
//   return {
//     name: 'signup',
//     displayName: 'Sign Up',
//     error: state.auth.error
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     handleSubmit(evt) {
//       evt.preventDefault()
//       const formName = evt.target.name
//       const username = evt.target.username.value
//       const password = evt.target.password.value
//       dispatch(authenticate(username, password, formName))
//     }
//   }
// }

// export const Login = connect(mapLogin, mapDispatch)(AuthForm)
// export const Signup = connect(mapSignup, mapDispatch)(AuthForm)