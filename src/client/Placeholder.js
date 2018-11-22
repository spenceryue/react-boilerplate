import React, { useState } from 'react';

export default function Placeholder(props) {
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
      Placeholder text
    </div>
  );
}
