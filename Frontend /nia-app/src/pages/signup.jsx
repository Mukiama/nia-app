import { useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [signupForm, setSignUpForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

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
      `https://nia-app-ik4c.onrender.com/users?email=${encodeURIComponent(
        signupForm.email
      )}`
    );

    const users = await existingUsers.json();

    if (users.length > 0) {
      setError("An account with this email already exists.");
      return;
    }

    const response = await fetch("https://nia-app-ik4c.onrender.com/users", {
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

    navigate("/dashboard");
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
}