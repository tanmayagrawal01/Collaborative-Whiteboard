import { fetchHealthCheck } from '../lib/api';

export default async function Home() {
  let healthStatus = "Checking...";
  try {
    const health = await fetchHealthCheck();
    healthStatus = health.status === "UP" ? "Backend is UP" : "Backend is DOWN";
  } catch (err) {
    healthStatus = "Backend is Unreachable";
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-5xl font-bold mb-4">Collaborative Whiteboard</h1>
      <p className="text-xl text-gray-300">
        Status: <span className="font-mono text-green-400">{healthStatus}</span>
      </p>
      {/* TODO: Team Member X will build the landing UI here */}
      <div className="mt-8">
        <a href="/dashboard" className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition">
          Go to Dashboard
        </a>
      </div>
    </main>
  );
}
