const mongoose = require('mongoose');
const redis = require('redis');
const { promisify } = require('util');
const keys = require('../config/keys');

// const redisUrl = 'redis://127.0.0.1:6379';
const client = redis.createClient(keys.redisUrl);

// client.get = promisify(client.get);
client.hget = promisify(client.hget);

const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function (options = {}) {
  this.useCache = true;
  this.hashKey = JSON.stringify(options.key || '');
  return this;
};

mongoose.Query.prototype.exec = async function () {
  if (!this.useCache) {
    return exec.apply(this, arguments);
  }

  const key = JSON.stringify(
    Object.assign({}, this.getFilter(), {
      collection: this.mongooseCollection.name
    })
  );

  //   const cachedValue = await client.get(key);
  const cachedValue = await client.hget(this.hashKey, key);

  if (cachedValue) {
    const doc = JSON.parse(cachedValue);
    // console.log('serving from cache');
    return Array.isArray(doc) ? doc.map(d => new this.model(d)) : new this.model(doc);
  }
  //  return exec.apply(this, arguments);

  // otherwise, issue the query and store the result into redis
  const result = await exec.apply(this, arguments);
  //   client.set(key, JSON.stringify(result));
  client.hset(this.hashKey, key, JSON.stringify(result));
  return result;
};

module.exports = {
  clearHash(hashKey) {
    client.del(JSON.stringify(hashKey));
  }
};
