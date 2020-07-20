const express = require('express');
const crypto = require('crypto');
const app = express();
const Worker = require('webworker-threads').Worker;

app.get('/', (req, res) => {
  const a = 1;

  /**
   * IMPORTANT NOTE -
   * The worker instance doesnot have variable a = 1 access inside it.
   * Webworkers totally work beyond the closer scope of outer / parent function
   */

  // The Worker Interface
  const worker = new Worker(function () {
    this.onmessage = function () {
      let counter = 0;
      while (counter < 1e9) {
        counter++;
      }

      postMessage(counter);
    };
  });

  // Message From worker into Our App
  worker.onmessage = function (myCounter) {
    console.log(myCounter);
  };

  // Message From Our app to the Worker instance
  worker.postMessage = function () {};
});

app.get('/fast', (req, res) => {
  res.send('This route was fast!');
});

app.listen(3000);
