import Pusher from 'pusher-js';
import React, { useState, useEffect, createContext } from 'react';
import { merging } from './utils';
// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;
window.count = 0;
export default function usePusherData(config) {
  // Initialize local data store
  const [store, _setStore] = useState({ data: [] });
  const setStore = merging(_setStore);

  // Initialize React context
  // const [PusherContext] = useState(() => {
  const [[PusherContext, PusherProvider]] = useState(() => {
    console.log(window.count++);
    // return (window.PusherContext = React.createContext());
    const context = (window.PusherContext = React.createContext());
    return [context, context.Provider];
  });
  if (window.PusherContext === PusherContext) console.warn('OK!');
  else console.warn('nooooo');

  // Create React Context.Provider component
  const [PusherData] = useState(() => ({ children }) => {
    return (
      // <PusherProvider>{children}</PusherProvider>
      <PusherContext.Provider>{children}</PusherContext.Provider>
      // <PusherContext.Provider value={store}>{children}</PusherContext.Provider>
    );
    // return <div value={store}>{children}</div>;
  });

  // Set up the connection to pusher.com
  useChannel(config, setStore);

  return [PusherData, PusherContext, store];
  // return [PusherProvider, PusherContext, store];
}

// TODO: Validate arguments (ensure not undefined)
// TODO: Check response of Pusher connection event to ensure not rejected
//       because of too many open connections (limit is 100 simultaneous I think)
export function useChannel(
  {
    key,
    options = { cluster: 'us2', forceTLS: true },
    channel: channelName,
    event: eventName,
  } = {},
  setStore
) {
  // Initialize Pusher connection
  const [pusher] = useState(() => new Pusher(key, options));
  useEffect(() => {
    return () => pusher.disconnect();
  }, []);

  // Subscribe to new incoming Pusher store
  useEffect(() => {
    const channel = pusher.subscribe(channelName);
    const handleNewData = ({ payload }) => {
      console.log(payload);
      setStore(store => ({
        data: store.data.concat(payload),
      }));
    };
    channel.bind(eventName, handleNewData);
    return () => pusher.unsubscribe(channelName);
  }, []);

  return [pusher];
}
