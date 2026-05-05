const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export async function fetchHealthCheck() {
  const response = await fetch(`${API_BASE_URL}/health`, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error('Failed to fetch health check');
  }
  return response.json();
}
