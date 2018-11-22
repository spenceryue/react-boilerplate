import Pusher from 'pusher-js';
import React, { useState, useEffect, createContext } from 'react';
import { merging } from './utils';

// Enable pusher logging - don't include this in production
// TODO: enable only if detect NODE_ENV=development
// Pusher.logToConsole = true;

export default function usePusher(config) {
  // Initialize local data store
  const [store, setStore] = useState({ data: [] });

  // Initialize React Context as well as Provider with `value` prop bound to
  // `store` for convenience
  const [[ProviderObject, Provider, Context]] = useState(() => {
    const Context = React.createContext();
    function ProviderObject({ children }) {
      return <Context.Provider value={this.value}>{children}</Context.Provider>;
    }
    const Provider = ProviderObject.bind(ProviderObject);
    return [ProviderObject, Provider, Context];
  });

  // Assigning `value` as a member of the function object allows the function
  // type to remain static, which prevents React from remounting the `Provider`
  ProviderObject.value = store;

  // Subscribe to Pusher channel
  usePusherChannel(config, merging(setStore));
  // `merging` makes setStore follow semantics of setState by merging with
  // instead of replacing the `store` object.

  return [Provider, Context];
}

export function usePusherChannel(
  { key, options = { cluster: 'us2', forceTLS: true }, channel, event } = {},
  setStore
) {
  // Check not falsey
  if (!key || !options || !channel || !event || !setStore)
    throw new TypeError('`config` object should have all members defined!');

  // Initialize Pusher connection
  const [pusher] = useState(() => new Pusher(key, options));
  useEffect(() => {
    // TODO: Ensure connection succeeded. (limit: 100 simultaneous connections)
    return () => pusher.disconnect();
  }, []);

  // Subscribe to Pusher channel
  useEffect(() => {
    const pusherChannel = pusher.subscribe(channel);
    const handlePayload = ({ payload }) => {
      setStore(({ data }) => ({ data: data.concat(payload) }));
    };
    pusherChannel.bind(event, handlePayload);

    return () => pusher.unsubscribe(channel);
  }, []);

  return [pusher];
}
