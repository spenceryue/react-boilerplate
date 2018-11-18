import React, { useState } from 'react';
import style from './index.css';
import usePusherData from './usePusherData';
import Area from './Area';

export default function App() {
  const [state, setState] = useState({
    color: 'white',
    count: 0,
  });

  const changeColor = () => {
    setState(state => {
      console.log('clicked!', state);
      const color = state.color == 'white' ? 'red' : 'white';
      const count = state.count + 1;
      return { color, count };
    });
  };

  const [PusherData, PusherContext] = usePusherData({
    key: '9dfb7224d7fd60cc9c5f',
    channel: 'sine-wave',
    event: 'new-data',
  });
  console.log('from app:', PusherContext);

  return (
    <>
      <div onClick={changeColor} style={{ color: state.color }}>
        React Boilerplate!
      </div>
      <PusherData>
        <Area context={PusherContext} />
      </PusherData>
    </>
  );
}
