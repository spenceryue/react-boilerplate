import Pusher from 'pusher';
import { sleep } from './utils';

var pusher = new Pusher({
  appId: '651114',
  key: '9dfb7224d7fd60cc9c5f',
  secret: '958b9a4ad341c43ade27',
  cluster: 'us2',
  encrypted: true,
});

const sample_rate = 10; // Hz
const buf_interval = 1; // second
const buf_size = buf_interval * sample_rate; // samples

async function* SampleData({
  t0 = Date.now() / 1000, // seconds
  sine_freq = 1, // Hz
  _sample_rate = sample_rate, // Hz
} = {}) {
  const ang_freq = 2 * Math.PI * sine_freq; // radians/second
  while (true) {
    const x = Date.now() / 1000;
    const y = Math.sin(ang_freq * x);
    const wait = ((2 * Math.random()) / _sample_rate) * 1000;
    // wait this long to generate a sample
    await sleep(wait);
    yield [x, y];
  }
}

async function main() {
  const sample_data = SampleData();
  while (true) {
    const data = [];
    for (const _ in [...Array(buf_size)]) {
      const point = (await sample_data.next()).value;
      data.push(point);
    }
    pusher.trigger('sine-wave', 'new-data', data);

    console.log(`${new Date().toLocaleTimeString()} | new-data triggered!\n`, {
      data,
    });
  }
}

main();
