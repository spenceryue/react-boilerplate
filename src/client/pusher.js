import Pusher from 'pusher-js';
import area from './area_plot.js';

// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

var pusher = new Pusher('9dfb7224d7fd60cc9c5f', {
  cluster: 'us2',
  forceTLS: true,
});

var channel = pusher.subscribe('sine-wave');
channel.bind('new-data', data => {
  console.log(JSON.stringify(data));
});
