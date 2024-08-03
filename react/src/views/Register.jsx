/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../contexts/ContextProvider.jsx";

export default function Register() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const password_confirmationRef = useRef();

  const [errors, setErrors] = useState(null);

  const { setUser, setToken } = useStateContext();

  const onSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: password_confirmationRef.current.value,
    }
    axiosClient.post('/signup', payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors)
        }
      })
  }
  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">
            Sign up
          </h1>
          {
            errors && <div className="alert">
              {
                Object.keys(errors).map(key => (
                  <p key={key}>{errors[key][0]}</p>
                ))
              }
            </div>
          }
          <input ref={nameRef} type="text" placeholder="Full Name" />
          <input ref={emailRef} type="email" placeholder="Email" />
          <input ref={passwordRef} type="password" placeholder="Password" />
          <input ref={password_confirmationRef} type="password" placeholder="Confirm your password" />
          <button className="btn btn-block">Sign up</button>
          <p className="message">
            Already have an account? <Link to='/login'>Login Now!</Link>
          </p>
        </form>
      </div>
    </div>
  )
}