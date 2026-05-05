"use client";

import React, { useState, useRef } from 'react';
import { Stage, Layer, Line, Rect, Circle, Text } from 'react-konva';

export default function CanvasBoard() {
  const [tool, setTool] = useState('pen');
  const [elements, setElements] = useState([]);
  const isDrawing = useRef(false);

  const handleMouseDown = (e) => {
    const pos = e.target.getStage().getPointerPosition();
    
    if (tool === 'text') {
      const textVal = window.prompt("Enter text:");
      if (textVal) {
        setElements([...elements, { type: 'text', x: pos.x, y: pos.y, text: textVal }]);
      }
      return;
    }

    isDrawing.current = true;
    if (tool === 'pen' || tool === 'eraser') {
      setElements([...elements, { type: 'line', tool, points: [pos.x, pos.y] }]);
    } else if (tool === 'rect') {
      setElements([...elements, { type: 'rect', startX: pos.x, startY: pos.y, width: 0, height: 0 }]);
    } else if (tool === 'circle') {
      setElements([...elements, { type: 'circle', startX: pos.x, startY: pos.y, radius: 0 }]);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing.current) return;
    
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastElement = { ...elements[elements.length - 1] };
    
    if (lastElement.type === 'line') {
      lastElement.points = lastElement.points.concat([point.x, point.y]);
    } else if (lastElement.type === 'rect') {
      lastElement.width = point.x - lastElement.startX;
      lastElement.height = point.y - lastElement.startY;
    } else if (lastElement.type === 'circle') {
      const dx = point.x - lastElement.startX;
      const dy = point.y - lastElement.startY;
      lastElement.radius = Math.sqrt(dx * dx + dy * dy);
    } else {
      return; // text doesn't need mouse move
    }

    const newElements = [...elements];
    newElements[newElements.length - 1] = lastElement;
    setElements(newElements);
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  return (
    <div className="flex flex-col items-center w-full h-full">
      {/* Toolbar */}
      <div className="bg-white shadow-md rounded-lg p-2 mb-4 flex gap-4">
        <button 
          className={`px-4 py-2 rounded transition ${tool === 'pen' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          onClick={() => setTool('pen')}
        >
          Pen
        </button>
        <button 
          className={`px-4 py-2 rounded transition ${tool === 'eraser' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          onClick={() => setTool('eraser')}
        >
          Eraser
        </button>
        <button 
          className={`px-4 py-2 rounded transition ${tool === 'rect' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          onClick={() => setTool('rect')}
        >
          Rectangle
        </button>
        <button 
          className={`px-4 py-2 rounded transition ${tool === 'circle' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          onClick={() => setTool('circle')}
        >
          Circle
        </button>
        <button 
          className={`px-4 py-2 rounded transition ${tool === 'text' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          onClick={() => setTool('text')}
        >
          Text / Note
        </button>
      </div>

      {/* Canvas Area */}
      <div className="border-2 border-gray-300 rounded-lg overflow-hidden bg-white shadow-inner cursor-crosshair">
        <Stage 
          width={800} 
          height={600}
          onMouseDown={handleMouseDown}
          onMousemove={handleMouseMove}
          onMouseup={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
        >
          <Layer>
            {elements.map((el, i) => {
              if (el.type === 'line') {
                return (
                  <Line
                    key={i}
                    points={el.points}
                    stroke="#df4b26"
                    strokeWidth={5}
                    tension={0.5}
                    lineCap="round"
                    lineJoin="round"
                    globalCompositeOperation={
                      el.tool === 'eraser' ? 'destination-out' : 'source-over'
                    }
                  />
                );
              } else if (el.type === 'rect') {
                return (
                  <Rect
                    key={i}
                    x={el.startX}
                    y={el.startY}
                    width={el.width}
                    height={el.height}
                    stroke="#df4b26"
                    strokeWidth={5}
                  />
                );
              } else if (el.type === 'circle') {
                return (
                  <Circle
                    key={i}
                    x={el.startX}
                    y={el.startY}
                    radius={el.radius}
                    stroke="#df4b26"
                    strokeWidth={5}
                  />
                );
              } else if (el.type === 'text') {
                return (
                  <Text
                    key={i}
                    x={el.x}
                    y={el.y}
                    text={el.text}
                    fontSize={24}
                    fill="#333"
                  />
                );
              }
              return null;
            })}
          </Layer>
        </Stage>
      </div>
    </div>
  );
}



