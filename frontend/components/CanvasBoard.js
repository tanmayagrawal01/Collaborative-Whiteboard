"use client";

import React from 'react';
import { Stage, Layer, Rect, Circle } from 'react-konva';

export default function CanvasBoard() {
  return (
    <div className="flex flex-col items-center w-full h-full">
      {/* Toolbar */}
      <div className="bg-white shadow-md rounded-lg p-2 mb-4 flex gap-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">Pen</button>
        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition">Eraser</button>
        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition">Rectangle</button>
        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition">Circle</button>
        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition">Sticky Note</button>
      </div>

      {/* Canvas Area */}
      <div className="border-2 border-gray-300 rounded-lg overflow-hidden bg-white shadow-inner">
        <Stage width={800} height={600}>
          <Layer>
            {/* Placeholder for drawing objects */}
            <Rect x={20} y={20} width={50} height={50} fill="red" />
            <Circle x={200} y={100} radius={50} fill="green" />
          </Layer>
        </Stage>
      </div>
    </div>
  );
}
