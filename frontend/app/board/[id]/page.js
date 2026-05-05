"use client";

import dynamic from 'next/dynamic';
import { use } from 'react';

const CanvasBoard = dynamic(() => import('../../../components/CanvasBoard'), {
  ssr: false,
});

export default function BoardRoom({ params }) {
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col">
      <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Whiteboard: {id}</h1>
        <a href="/dashboard" className="text-blue-600 hover:underline">Back to Dashboard</a>
      </header>
      
      <main className="flex-grow flex items-center justify-center p-4">
        <CanvasBoard />
      </main>
    </div>
  );
}

