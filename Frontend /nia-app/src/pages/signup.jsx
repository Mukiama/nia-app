<<<<<<< HEAD

import {useState} from 'react'
import {Link, useNavigate} from 'react-router'


export default function Signup() {
    const [signupForm, setSignUpForm] = useState({
        name : '',
        email : '',
        password : ''
    })

    const [showPassword, setShowPassword] = useState(false)

    const [error, setError] = useState('')

    function validateForm() {
        if (!signupForm.name.trim()) return 'Name is required'
        if (!signupForm.email.include('@')) return 'Enter a valid email'
        if (!signupForm.password.length > 6) return 'Password should be 6 or more characters'
        return ''
    }

    const navigate = useNavigate()

    function handleSubmit (event) {
        event.preventDefault()

        const validate = validateForm()

        if (validate) {
            setError(validate)
            return
        }

        fetch('',        // signup endpoint
            {
                method : 'POST',
                headers : {
                    'Content-type' : 'application/json'
                },
                body : JSON.stringify(signupForm)
            }
        )
        .then((response) => {
            if(!response.ok){
                throw new Error('Error occurred')
            }else {
                return response.json()
            }
        })
        .then((data) => {
            console.log(data)
            setSignUpForm({
                name : '',
                email : '',
                password : ''
            })
            alert('Signup successful')
            // navigate('/homepage')
        })
        .catch((error) => setError(error.message))
    }

    function handleOnChange(e) {
        setSignUpForm({...signupForm, [e.target.name] : e.target.value})
    }



    return (
        <>
        <div className='signup-page'>
            <div className='signup-card'>
                <h1 className='signup-title'>
                    Sign up
                </h1>
                
                <form onSubmit={handleSubmit} className='signup-form'> 
                    <input 
                    type="text" 
                    name = 'name'
                    value = {signupForm.name}
                    placeholder='Enter name'
                    onChange={(e) => handleOnChange(e)}
                    />
                    <input 
                    type="email" 
                    name = 'email'
                    value = {signupForm.email}
                    placeholder='Enter email'
                    onChange={(e) => handleOnChange(e)}
                    />
                    <div className='password-field'>
                        <input 
                        type={showPassword ? 'text' : 'password'} 
                        name = 'password'
                        value = {signupForm.password}
                        placeholder='Enter password'
                        onChange={(e) => handleOnChange(e)}
                        />
                        <button
                            type='button'
                            onClick={() => setShowPassword((prev) => !prev)}
                            className='toggle-password'
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>

                    <button type='submit' className='submit-btn'>
                        Submit
                    </button>
                </form>

                <p className='login-link'>
                    Already have an account?
                    {/* <Link to='/login'>Login</Link> */}
                    <a href="/login">Login</a>
                </p>
                
            </div>
        </div>


        </>
    )

=======
import { useState } from "react";
import "../App.css";

export default function Signup() {
  const [signupForm, setSignUpForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function validateForm() {
    if (!signupForm.name.trim()) {
      return "Name is required";
    }

    if (!signupForm.email.includes("@")) {
      return "Enter a valid email";
    }

    if (signupForm.password.length < 6) {
      return "Password should be 6 or more characters";
    }

    return "";
  }

  async function handleSubmit(event) {
  event.preventDefault();

  const validationError = validateForm();

  if (validationError) {
    setError(validationError);
    return;
  }

  try {
    const existingUsers = await fetch(
      `http://localhost:3001/users?email=${encodeURIComponent(
        signupForm.email
      )}`
    );

    const users = await existingUsers.json();

    if (users.length > 0) {
      setError("An account with this email already exists.");
      return;
    }

    const response = await fetch("http://localhost:3001/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupForm),
    });

    if (!response.ok) {
      throw new Error("Signup failed.");
    }

    const data = await response.json();

    console.log("Created user:", data);

    setSignUpForm({
      name: "",
      email: "",
      password: "",
    });

    alert("Signup successful");
  } catch (error) {
    setError(error.message);
  }
}

  function handleOnChange(e) {
    setSignUpForm({
      ...signupForm,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>Create your Nia account</h1>

        {error && <p className="auth-error">{error}</p>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label>Name</label>

            <input
              type="text"
              name="name"
              value={signupForm.name}
              placeholder="Enter your name"
              onChange={handleOnChange}
            />
          </div>

          <div className="auth-field">
            <label>Email</label>

            <input
              type="email"
              name="email"
              value={signupForm.email}
              placeholder="Enter your email"
              onChange={handleOnChange}
            />
          </div>

          <div className="auth-field">
            <label>Password</label>

            <div className="password-row">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={signupForm.password}
                placeholder="Enter your password"
                onChange={handleOnChange}
              />

              <button
                type="button"
                className="show-password"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button type="submit" className="auth-button">
            Create Account
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?{" "}
          <a href="/login" className="auth-link">
            Login
          </a>
        </p>
      </div>
    </div>
  );
>>>>>>> origin/dev
}