import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  function handleSubmit(e) {
    e.preventDefault();

  if (!email || !password) {
    setError("Please enter your email and password.");
    return;
  }

  setError("");

  console.log("Login:", {
    email,
    password,
  });
}

  return (
    <div>
      <h1>Login to Nia</h1>

      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>

        <div>
          <label>Password</label>

          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
        >
        {showPassword ? "Hide" : "Show"}
        </button>
          
        </div>

        <label>
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
              Remember me
        </label>

        <button type="submit">
          Login
        </button>
      </form>

      <a href="/forgot-password">
        Forgot password?
      </a>

      <p>
        Don't have an account?{" "}
        <a href="/signup">Sign up</a>
      </p>
    </div>
  );
}
