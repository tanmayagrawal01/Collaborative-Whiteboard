"use client";

import React, { useState, useRef } from 'react';
import { Stage, Layer, Line, Rect, Circle, Text } from 'react-konva';

export default function CanvasBoard() {
  const [tool, setTool] = useState('pen');
  const [color, setColor] = useState('#000000');
  const [elements, setElements] = useState([]);
  const isDrawing = useRef(false);

  // WebSocket readiness dummy function
  const broadcastDrawEvent = (element) => {
    // TODO: Send element data via WebSocket to other clients
    console.log('WebSocket Broadcast:', element);
  };

  const handleMouseDown = (e) => {
    const pos = e.target.getStage().getPointerPosition();
    
    if (tool === 'text') {
      const textVal = window.prompt("Enter text:");
      if (textVal) {
        const newElement = { type: 'text', x: pos.x, y: pos.y, text: textVal, color };
        setElements([...elements, newElement]);
        broadcastDrawEvent(newElement);
      }
      return;
    }

    isDrawing.current = true;
    let newElement = null;
    if (tool === 'pen' || tool === 'eraser') {
      newElement = { type: 'line', tool, points: [pos.x, pos.y], color };
    } else if (tool === 'rect') {
      newElement = { type: 'rect', startX: pos.x, startY: pos.y, width: 0, height: 0, color };
    } else if (tool === 'circle') {
      newElement = { type: 'circle', startX: pos.x, startY: pos.y, radius: 0, color };
    }
    
    if (newElement) {
      setElements([...elements, newElement]);
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
    if (isDrawing.current) {
      isDrawing.current = false;
      // Broadcast the finished shape/line
      const lastElement = elements[elements.length - 1];
      broadcastDrawEvent(lastElement);
    }
  };

  return (
    <div className="flex flex-col items-center w-full h-full">
      {/* Toolbar */}
      <div className="bg-white shadow-md rounded-lg p-2 mb-4 flex gap-4 items-center">
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

        {/* Color Picker */}
        <div className="flex items-center ml-4 border-l pl-4 border-gray-300">
          <label className="mr-2 text-sm text-gray-600 font-medium">Color:</label>
          <input 
            type="color" 
            value={color} 
            onChange={(e) => setColor(e.target.value)}
            className="w-8 h-8 rounded cursor-pointer border-none"
          />
        </div>
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
                    stroke={el.color}
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
                    stroke={el.color}
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
                    stroke={el.color}
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
                    fill={el.color}
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



