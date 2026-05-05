const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export async function fetchHealthCheck() {
  const response = await fetch(`${API_BASE_URL}/health`, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error('Failed to fetch health check');
  }
  return response.json();
}

export async function loginUser(email, password) {
  const res = await fetch(`${API_BASE_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || 'Login failed');
  }
  return res.json();
}

export async function signupUser(name, email, password) {
  const res = await fetch(`${API_BASE_URL}/users/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });
  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || 'Signup failed');
  }
  return res.json();
}

export async function createSession(userId) {
  const res = await fetch(`${API_BASE_URL}/sessions/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId })
  });
  if (!res.ok) throw new Error('Failed to create session');
  return res.json();
}

export async function joinSession(userId, sessionCode) {
  const res = await fetch(`${API_BASE_URL}/sessions/join`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, sessionCode })
  });
  if (!res.ok) throw new Error('Invalid session code');
  return res.json();
}

