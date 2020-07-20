process.env.UV_THREADPOOL_SIZE = 1;
const cluster = require('cluster');

// console.log(cluster.isMaster);

// Is the file being executed in master mode?
if (cluster.isMaster) {
  // Cause index.js to be executed *again* but in child mode
  cluster.fork();
  cluster.fork();
  // cluster.fork();
  // cluster.fork();
  // cluster.fork();
  // cluster.fork();

  // [RULE] no of children <= no. of physical or logical cores of the CPU
} else {
  // I m a child, I am going to act like a server and do nothing else
  const express = require('express');
  const app = express();
  const crypto = require('crypto');

  /**
   * Blocking the event loop
   *
   */

  // This code gets executed inside the event loop, not in thread pool nor offloaded to OS
  /**
   *  [Refactoring after lecture 27]
   */
  // function doWork(duration) {
  //   const start = Date.now();
  //   while (Date.now() - start < duration) {}
  // }

  app.get('/', (req, res) => {
    // doWork(5000);
    crypto.pbkdf2('password', 'salt', 100000, 512, 'sha512', (err, data) => {
      res.send('Hi there!');
    });
    // res.send('Hi there!');
  });

  app.get('/fast', (req, res) => {
    res.send('This route was fast!');
  });

  app.listen(3000);
}
