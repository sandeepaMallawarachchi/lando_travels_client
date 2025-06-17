import React, { useEffect, useState } from "react";

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      {/* Outer ring */}
      <div
        className="fixed top-0 left-0 w-10 h-10 border-2 border-gray-300 rounded-full pointer-events-none transition-transform duration-150 z-[9999]"
        style={{
          transform: `translate(${position.x - 20}px, ${position.y - 20}px)`,
        }}
      />
      {/* Inner dot */}
      <div
        className="fixed top-0 left-0 w-2 h-2 bg-gray-300 rounded-full pointer-events-none z-[9999]"
        style={{
          transform: `translate(${position.x - 4}px, ${position.y - 4}px)`,
        }}
      />
    </>
  );
};

export default CustomCursor;
