import express from 'express';
import logger from 'morgan';

export default class Server {
  constructor() {
    this.app = express();
    this.app.use(logger('dev'));
    this.app.use(express.static('dist/public'));
    // app.get('/hi', (req, res) => res.send('Hello World!'));
  }
  start() {
    try {
      app.listen(3000, () => console.log('Listening on port 3000.'));
      return true;
    } catch (e) {
      console.err(e);
      return false;
    }
  }
}
