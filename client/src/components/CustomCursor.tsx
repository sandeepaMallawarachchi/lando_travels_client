import React, { useEffect, useRef, useState } from "react";

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const currentPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", move);

    const animate = () => {
      currentPos.current.x += (mousePosition.x - currentPos.current.x) * 0.25;
      currentPos.current.y += (mousePosition.y - currentPos.current.y) * 0.25;

      if (outerRef.current) {
        outerRef.current.style.transform = `translate(${currentPos.current.x - 20}px, ${currentPos.current.y - 20}px)`;
      }
      if (innerRef.current) {
        innerRef.current.style.transform = `translate(${mousePosition.x - 4}px, ${mousePosition.y - 4}px)`;
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, [mousePosition]);

  return (
    <>
      {/* Outer ring */}
      <div
        ref={outerRef}
        className="hidden sm:block fixed top-0 left-0 w-10 h-10 border-2 border-gray-300 rounded-full pointer-events-none z-[9999]"
      />
      {/* Inner dot */}
      <div
        ref={innerRef}
        className="hidden sm:block fixed top-0 left-0 w-2 h-2 bg-gray-300 rounded-full pointer-events-none z-[9999]"
      />
    </>
  );
};

export default CustomCursor;
