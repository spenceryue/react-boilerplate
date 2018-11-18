import Pusher from 'pusher-js';
import React, { useState, useEffect, createContext } from 'react';
import { merging } from './utils';
// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

export default function usePusherData(config) {
  // Initialize local data store
  const [store, _setStore] = useState({
    data: [],
  });
  const setStore = merging(_setStore);

  // Initialize React context
  const [PusherContext] = useState(() => React.createContext());

  // Create React Context.Provider component
  const PusherData = ({ children }) => {
    return (
      <PusherContext.Provider value={store}>{children}</PusherContext.Provider>
    );
  };

  // Set up the connection to pusher.com
  const [pusher] = useChannel(config, setStore);

  return [PusherData, PusherContext];
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
    const handleNewData = latestData => {
      latestData = JSON.stringify(latestData);
      setStore(store => ({
        data: store.data.concat(latestData),
      }));
    };
    channel.bind(eventName, handleNewData);
    return () => pusher.unsubscribe(channelName);
  }, []);

  return [pusher];
}
