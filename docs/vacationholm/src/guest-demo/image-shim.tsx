import React from 'react';
export default function Image({src,alt,fill,className,style,priority,...props}:any){return <img src={typeof src==='string'?src:src?.src} alt={alt||''} className={className} style={{...(fill?{position:'absolute',inset:0,width:'100%',height:'100%'}:{}),...style}} {...props}/>}
