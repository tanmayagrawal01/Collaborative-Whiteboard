export default function BoardRoom({ params }) {
  const { id } = params;

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col">
      <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Whiteboard: {id}</h1>
        <a href="/dashboard" className="text-blue-600 hover:underline">Back to Dashboard</a>
      </header>
      
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg">Canvas area</p>
          {/* TODO: Team Member X will implement the Canvas and WebSockets here */}
        </div>
      </main>
    </div>
  );
}
