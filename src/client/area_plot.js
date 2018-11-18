import React, { useState, useEffect, useRef } from 'react';
import { hot } from 'react-hot-loader';
import * as d3 from 'd3-shape';

function plot({ data }) {
  const canvas = useRef();
  const context = canvas.context;

  const area = d3.area();
  area.context(context);
  area.curve(d3.curve(d3.curveCatmullRom.alpha(0.5))); // centripetal CatmullRom

  useEffect(() => {
    area.data(data);
  });

  return <canvas ref={canvas} />;
}
