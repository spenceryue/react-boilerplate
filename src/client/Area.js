import React, { useState, useEffect, useRef, useContext } from 'react';
import * as d3 from 'd3-shape';

const TestContext = React.createContext();
const ExampleHook = () => {
  const hookExample = useContext(TestContext);
  return <h2>{`Value from useContext: ${JSON.stringify(hookExample)}`}</h2>;
};
export default function Area(props) {
  const a = useContext(props.context);
  console.log({ props, a });
  return (
    <TestContext.Provider value={{ foo: 'bar' }}>
      <ExampleHook />
      <TestContext.Consumer>
        {value => (
          <h2>{`Value from TestContext.Consumer: ${JSON.stringify(value)}`}</h2>
        )}
      </TestContext.Consumer>
    </TestContext.Provider>
  );
}
/*
export default function Area({ context }) {
  console.log('>>>>>>>>>', { context });
  const canvas = useRef(null);
  const d = useContext(context);
  console.log('>>>>>>>>>', { d });
  const data = d.data;
  const [area] = useState(() => d3.area());

  console.log('>>>>>>>>>', { data });
  useEffect(() => {
    area.context(canvas.current.context);
    area.curve(d3.curveCatmullRom.alpha(0.5)); // centripetal CatmullRom
  }, []);

  useEffect(() => area(data), [data]);

  return <canvas ref={canvas} />;
  // return <div>hiii</div>;
}
*/
