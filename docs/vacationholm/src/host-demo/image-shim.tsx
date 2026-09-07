import React from 'react';

export default function Image({ src, alt, fill, style, ...props }: React.ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean }) {
  return <img src={typeof src === 'string' ? src : ''} alt={alt || ''} {...props} style={fill ? { ...style, position: 'absolute', inset: 0, width: '100%', height: '100%' } : style} />;
}
