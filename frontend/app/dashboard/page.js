export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      {/* TODO: Team Member Y will implement board listing and creation here */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-blue-500 cursor-pointer transition">
          <h2 className="text-xl font-semibold mb-2">My First Board</h2>
          <p className="text-gray-400">Created 2 hours ago</p>
          <a href="/board/test-id" className="text-blue-400 mt-4 inline-block">Open Board &rarr;</a>
        </div>
      </div>
    </div>
  );
}
