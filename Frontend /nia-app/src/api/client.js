const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function setAuth({ token, user }) {
  localStorage.setItem("niaAuth", JSON.stringify({ token, user }));
}

function getAuth() {
  const stored = localStorage.getItem("niaAuth");
  return stored ? JSON.parse(stored) : null;
}

function getToken() {
  return getAuth()?.token || null;
}

function getUser() {
  return getAuth()?.user || null;
}

function clearAuth() {
  localStorage.removeItem("niaAuth");
}

async function authFetch(path, options = {}) {
  const token = getToken();

  const headers = {
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  return fetch(`${API_URL}${path}`, { ...options, headers });
}

export { API_URL, setAuth, getAuth, getToken, getUser, clearAuth, authFetch };