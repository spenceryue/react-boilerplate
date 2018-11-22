import React, { useState } from 'react';
import style from './index.css';
import usePusherData from './usePusherData';
import Area from './Area';
import { memoized } from './utils';

function Placeholder(props) {
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

  return (
    <div onClick={changeColor} style={{ color: state.color }}>
      React Boilerplate!
    </div>
  );
}

export default function App() {
  const [PusherData, PusherContext, store] = usePusherData({
    key: '9dfb7224d7fd60cc9c5f',
    channel: 'sine-wave',
    event: 'new-data',
  });

  if (window.PusherContext === PusherContext) console.warn('OK!');
  else console.warn('nooooo');

  return (
    <>
      <Placeholder />
      <PusherData value={store}>
        <Area context={PusherContext} data={store.data} />
      </PusherData>
    </>
  );
  /*
      <window.PusherContext.Provider value={store}>
      </window.PusherContext.Provider>
   */
}
