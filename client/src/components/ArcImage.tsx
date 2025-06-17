import React, { lazy } from 'react'
interface ArcImageProps {
  src: string
  style: React.CSSProperties
  className?: string
}
export function ArcImage({ src, style, className = '' }: ArcImageProps) {
  return (
    <div
      className={`absolute w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden shadow-lg transition-all hover:scale-110 ${className}`}
      style={style}
    >
      <img
        src={src}
        alt=""
        className="w-full h-full object-cover transform rotate-90"
        loading="lazy"
        
      />
    </div>
  )
}
