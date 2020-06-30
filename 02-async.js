const https = require("https");
const chalk = require("chalk");

const start = Date.now();

// Benchmarking https async request
function makeRequest() {
  https
    .request("https://jsonplaceholder.typicode.com/todos", (res) => {
      res.on("data", () => {});
      res.on("end", () => {
        console.log(chalk.bold.bgRedBright("Benchmark 1:"), Date.now() - start);
      });
    })
    .end();
}

makeRequest();
makeRequest();
makeRequest();
makeRequest();
makeRequest();
makeRequest();
