import { useState } from "react";
import "../App.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  async function handleSubmit(e) {
  e.preventDefault();

  if (!email || !password) {
    setError("Please enter your email and password.");
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:3001/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
    );

    const users = await response.json();

    if (users.length === 0) {
      setError("Invalid email or password.");
      return;
    }

    const user = users[0];

    console.log("Logged in:", user);

    localStorage.setItem(
      "niaUser",
      JSON.stringify(user)
    );

    setError("");

    window.location.href = "/dashboard";
  } catch (error) {
    setError("Unable to connect to the server.");
  }
}

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>Login to Nia</h1>

        {error && <p className="auth-error">{error}</p>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label>Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="auth-field">
            <label>Password</label>

            <div className="password-row">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />

              <button
                type="button"
                className="show-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <label className="remember-me">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            Remember me
          </label>

          <button type="submit" className="auth-button">
            Login
          </button>
        </form>

        <p>
          <a href="/forgot-password" className="auth-link">
            Forgot password?
          </a>
        </p>

        <p className="auth-footer">
          Don't have an account?{" "}
          <a href="/signup" className="auth-link">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}