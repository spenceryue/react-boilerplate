import React, { useState, useEffect, useRef, useContext } from 'react';
import * as d3 from 'd3-shape';

/*
  TODO:
    Why is the area plot not filling in?
      Need to define `y1` d3 accessor?
    How do we animate sample-by-sample?
    How do we keep only the number of points that fit on the screen?
      Should we keep slightly more to allow for zooming?
    Scale the height and width dynamically/with user input
*/
export default class Area extends React.Component {
  static contextType;
  constructor(props) {
    super(props);
    Area.contextType = props.context;
    this.canvasRef = React.createRef();
    this.canvas = () => this.canvasRef.current;
    this.area = d3.area();
    this.t0 = Date.now() / 1000;
  }
  componentDidMount() {
    const {
      width: width,
      height: height,
    } = this.canvas().parentElement.getBoundingClientRect();
    this.canvas().width = this.width = width;
    this.canvas().height = this.height = height;
    this.ctx = this.canvas().getContext('2d');
    this.area
      .context(this.ctx)
      .x(([x]) => {
        // console.log(10 * (x - this.t0));
        return 50 * (x - this.t0);
      })
      .y(([, y]) => {
        // console.log(100 * y);
        return 100 * y;
      })
      .curve(d3.curveCatmullRom.alpha(0.5)); // centripetal CatmullRom
    this.clear();
    console.log({ data: this.context.data });
  }

  componentDidUpdate() {
    this.ctx.translate(0, this.height / 2);
    this.clear();
    this.ctx.beginPath();
    this.area(this.context.data);
    // this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.translate(0, -this.height / 2);
  }
  componentWillUnmount() {
    console.log('Unmounting!');
  }
  clear() {
    const save = this.ctx.fillStyle;
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, this.width, this.height);
    // this.ctx.clearRect(0, 0, this.canvas().width, this.canvas().height);
    this.ctx.fillStyle = save;
  }
  render() {
    return <canvas ref={this.canvasRef} />;
  }
}

// TODO: Reimplement with React functional component to compare for convenience/clarity.
/*export default function Area({ context }) {
  const canvas = useRef(null);
  const { data } = useContext(context);
  const [area] = useState(() => d3.area());

  useEffect(() => {
    const ctx = canvas.current.getContext('2d');
    area.context(ctx);
    area.curve(d3.curveCatmullRom.alpha(0.5)); // centripetal CatmullRom
    ctx.fillRect(
      0,
      0,
      Math.random() * canvas.current.width,
      Math.random() * canvas.current.height
    );
    console.log('here', { data });
  }, []);

  useEffect(
    () => {
      area(data);
      console.log('or here?...', { data });
    },
    [data]
  );

  return <canvas ref={canvas} />;
}*/
