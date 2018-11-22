import React from 'react';
import './index.css';
import usePusher from './usePusher';
import Area from './Area';
import Placeholder from './Placeholder';

export default function App() {
  const [Pusher, PusherContext] = usePusher({
    key: '9dfb7224d7fd60cc9c5f',
    channel: 'sine-wave',
    event: 'new-data',
  });

  return (
    <>
      <Placeholder />
      <Pusher>
        <Area context={PusherContext} />
      </Pusher>
    </>
  );
}
