import React, { useState, useEffect, useRef } from 'react';

function App() {
  const canvasRef = useRef();
  const [triangle, setTriangle] = useState({ x: 200, y: 200, height: 100, length: 50, show: false }); 
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#F5EEDD'; 
    context.fillRect(0, 0, canvas.width, canvas.height);

    if (triangle.show) {
      drawTriangle(context);
    }

    const handleMouseDown = (e) => onMouseDown(e, canvas);
    const handleMouseMove = (e) => onMouseMove(e, canvas);
    const handleMouseUp = () => onMouseUp();

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
    };
  }, [triangle, isMouseDown, offset]);

  function drawTriangle(context) {
    context.fillStyle = 'blue';
    context.beginPath();
    context.moveTo(triangle.x, triangle.y);
    context.lineTo(triangle.x + triangle.length, triangle.y + triangle.height);
    context.lineTo(triangle.x - triangle.length, triangle.y + triangle.height);
    context.closePath();
    context.fill();
  }

  function isInsideTriangle(mouseX, mouseY) {

        const minX = Math.min(triangle.x - triangle.length, triangle.x, triangle.x + triangle.length);
        const maxX = Math.max(triangle.x - triangle.length, triangle.x, triangle.x + triangle.length);
        const minY = Math.min(triangle.y, triangle.y + triangle.height);
        const maxY = Math.max(triangle.y, triangle.y + triangle.height);

        return mouseX >= minX && mouseX <= maxX && mouseY >= minY && mouseY <= maxY;
  }

  function onMouseDown(e, canvas) {
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    if (triangle.show && isInsideTriangle(mouseX, mouseY)) {
      setIsMouseDown(true);
      setOffset({ x: mouseX - triangle.x, y: mouseY - triangle.y });
    }
  }

  function onMouseMove(e, canvas) {
    e.preventDefault();
    if (!isMouseDown) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const newX = mouseX - offset.x;
    const newY = mouseY - offset.y;

    setTriangle({ ...triangle, x: newX, y: newY });
  }

  function onMouseUp() {
    setIsMouseDown(false);
  }

  const handleShow = () => {
    setTriangle({ ...triangle, show: true });
  };

  const handleHide = () => {
    setTriangle({ ...triangle, show: false });
  };

  const handleReset = () => {
    setTriangle({ ...triangle, x: 200, y: 200, show: true });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          backgroundColor: '#f0f0f0',
          borderRadius: '12px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
          margin: '20px auto',
          maxWidth: '90%',
          height: 'auto',
          aspectRatio: '16 / 9',
          transition: 'box-shadow 0.3s ease',
          ':hover': {
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.4)',
          },
        }}
      />
      <div
        style={{
          display: 'flex',
          gap: '15px',
          marginTop: '20px',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        <button
          onClick={handleShow}
          style={{
            padding: '12px 25px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.3s ease',
            fontSize: '18px',
            fontWeight: '500',
            ':hover': {
              backgroundColor: '#45a049',
              transform: 'scale(1.05)',
              boxShadow: '0 3px 7px rgba(0, 0, 0, 0.3)',
            },
            ':active': {
              backgroundColor: '#388e3c',
              transform: 'scale(0.95)',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
            },
          }}
        >
          Show Triangle
        </button>
        <button
          onClick={handleHide}
          style={{
            padding: '12px 25px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.3s ease',
            fontSize: '18px',
            fontWeight: '500',
            ':hover': {
              backgroundColor: '#d32f2f',
              transform: 'scale(1.05)',
              boxShadow: '0 3px 7px rgba(0, 0, 0, 0.3)',
            },
            ':active': {
              backgroundColor: '#c62828',
              transform: 'scale(0.95)',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
            },
          }}
        >
          Hide Triangle
        </button>
        <button
          onClick={handleReset}
          style={{
            padding: '12px 25px',
            backgroundColor: '#008CBA',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.3s ease',
            fontSize: '18px',
            fontWeight: '500',
            ':hover': {
              backgroundColor: '#007ba7',
              transform: 'scale(1.05)',
              boxShadow: '0 3px 7px rgba(0, 0, 0, 0.3)',
            },
            ':active': {
              backgroundColor: '#006ba7',
              transform: 'scale(0.95)',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
            },
          }}
        >
          Reset Position
        </button>
      </div>
    </div>
  );
}

export default App;
