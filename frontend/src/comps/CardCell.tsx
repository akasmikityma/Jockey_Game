import React from 'react';

interface CardProps {
  src: string;
  alt: string;
  style: React.CSSProperties;
  className: string;
}

const Card: React.FC<CardProps> = ({ src, alt, style, className }) => {
  return (
    <div className={`rounded-sm absolute border ${className}`} style={style}>
      <img src={src} alt={alt} className="h-full w-full object-cover rounded-sm" />
    </div>
  );
};

export default Card;
