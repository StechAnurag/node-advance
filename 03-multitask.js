const fs = require("fs");
const https = require("https");
const crypto = require("crypto");
const chalk = require("chalk");

const start = Date.now();

function makeRequest() {
  https
    .request("https://jsonplaceholder.typicode.com/todos", (res) => {
      res.on("data", () => {});
      res.on("end", () => {
        console.log(
          chalk.bold.bgRedBright("Making request:"),
          Date.now() - start
        );
      });
    })
    .end();
}

function doHash() {
  crypto.pbkdf2("password", "salt", 100000, 512, "sha512", (err, data) => {
    console.log(chalk.bold.bgGreenBright("Hashing:"), Date.now() - start);
  });
}

makeRequest();

fs.readFile("multitask.js", "utf-8", (err, data) => {
  console.log(chalk.bold.bgBlueBright("File system:"), Date.now() - start);
});

doHash();
doHash();
doHash();
doHash();

/**
 * Q.) In what order these console logs gonna appear?
 */
