import React, { useState, useEffect, useRef, useContext } from 'react';
import * as d3 from 'd3-shape';

export default function Area({ context }) {
  const canvas = useRef(null);
  const data = useContext(context);
  const [area] = useState(() => d3.area());

  useEffect(() => {
    const ctx = canvas.current.getContext('2d');
    area.context(ctx);
    area.curve(d3.curveCatmullRom.alpha(0.5)); // centripetal CatmullRom
    // ctx.fillRect(0, 0, 100, 100);
    console.log('here');
  }, []);

  useEffect(() => area(data), [data]);

  return <canvas ref={canvas} />;
}