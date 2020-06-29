// CHANGING THREADPOOL SIZE
// process.env.UV_THREADPOOL_SIZE = 2;

const crypto = require("crypto");
const chalk = require("chalk");

const start = Date.now();

// Benchmark 1:
crypto.pbkdf2("password", "salt", 100000, 512, "sha512", (err, data) => {
  console.log(chalk.bold.bgRedBright("Benchmark 1:"), Date.now() - start);
});

// Benchmark 2:
crypto.pbkdf2("password", "salt", 100000, 512, "sha512", (err, data) => {
  console.log(chalk.bold.bgRedBright("Benchmark 2:"), Date.now() - start);
});

// Benchmark 3:
crypto.pbkdf2("password", "salt", 100000, 512, "sha512", (err, data) => {
  console.log(chalk.bold.bgRedBright("Benchmark 3:"), Date.now() - start);
});

// Benchmark 4:
crypto.pbkdf2("password", "salt", 100000, 512, "sha512", (err, data) => {
  console.log(chalk.bold.bgRedBright("Benchmark 4:"), Date.now() - start);
});

// Benchmark 5:
crypto.pbkdf2("password", "salt", 100000, 512, "sha512", (err, data) => {
  console.log(chalk.bold.bgRedBright("Benchmark 5:"), Date.now() - start);
});
