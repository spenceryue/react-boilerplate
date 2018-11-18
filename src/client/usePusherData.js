import Pusher from 'pusher-js';
import React, { useState, useEffect, useMemo, createContext } from 'react';

// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

// TODO: Validate arguments (ensure not undefined)
// TODO: Check response of Pusher connection event to ensure not rejected
//       because of too many open connections (limit is 100 simultaneous I think)
export default function usePusherData({
  key,
  options = { cluster: 'us2', forceTLS: true },
  channel: channelName,
  event: eventName,
} = {}) {
  // Initialize Pusher connection
  /*const [pusher] = useState(() => new Pusher(key, options));
  useEffect(() => {
    return () => pusher.disconnect();
  }, []);*/
  const [pusher] = useState(null);

  // Initialize React context
  const [PusherContext] = useState(() => React.createContext({ data: [] }));
  console.log('from source:', PusherContext);
  // const [PusherContext] = useState({ Provider: 'div' });

  // Initialize data array as local state
  const [data, setData] = useState([]);

  // Subscribe to new incoming Pusher data
  /*useEffect(() => {
    const channel = pusher.subscribe(channelName);
    const handleNewData = newData => {
      newData = JSON.stringify(newData);
      setData(data.concat(newData));
    };
    channel.bind(eventName, handleNewData);
    return () => pusher.unsubscribe(channelName);
  }, []);*/

  // Create React Context.Provider component
  // const PusherData = ({ children }) => <div>hahaha</div>;
  const PusherData = ({ children }) => {
    console.log('from PusherData:', { data, children, PusherContext });
    return (
      <PusherContext.Provider values={{ data }}>
        {children}
      </PusherContext.Provider>
    );
  };

  return [PusherData, PusherContext, pusher];
}
