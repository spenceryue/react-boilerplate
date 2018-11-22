import React, { useState, useEffect, useRef, useContext } from 'react';
import * as d3 from 'd3-shape';

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

export default class Area extends React.PureComponent {
  static contextType;
  constructor(props) {
    super(props);
    Area.contextType = props.context;
    this.canvasRef = React.createRef();
    this.canvas = () => this.canvasRef.current;
    this.area = d3.area();
    this.t0 = Date.now() / 1000;
    if (window.PusherContext === Area.contextType) console.warn('OK!');
    else console.warn('nooooo');
  }
  componentDidMount() {
    this.canvas().width = 400;
    this.canvas().height = 400;
    this.ctx = this.canvas().getContext('2d');
    this.area
      .context(this.ctx)
      .x(([x]) => {
        // console.log(10 * (x - this.t0));
        return 10 * (x - this.t0);
      })
      .y(([, y]) => {
        // console.log(100 * y);
        return 100 * y;
      })
      .curve(d3.curveCatmullRom.alpha(0.5)); // centripetal CatmullRom
    console.log('here', { data: this.props.data });
  }

  componentDidUpdate() {
    this.clear();
    this.ctx.beginPath();
    this.area(this.props.data);
    // this.ctx.closePath();
    // this.area(this.context.data);
    // this.ctx.fill();
    this.ctx.stroke();
    console.log('or here?...', { data: this.props.data });
  }
  componentWillUnmount() {
    console.log('hiiiii');
  }
  clear() {
    this.ctx.clearRect(0, 0, this.canvas().width, this.canvas().height);
  }
  render() {
    if (window.PusherContext === Area.contextType) console.warn('OK!');
    else console.warn('nooooo');

    return <canvas ref={this.canvasRef} />;
  }
}
