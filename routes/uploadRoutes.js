const AWS = require('aws-sdk');
const { v1: uuid } = require('uuid');
const keys = require('../config/keys');
const chalk = require('chalk');

const s3 = new AWS.S3({
  accessKeyId: keys.accessKeyId,
  secretAccessKey: keys.secretAccessKey,
  signatureVersion: 'v4',
  region: 'us-east-2'
});

module.exports = app => {
  app.get('/api/upload', async (req, res, next) => {
    try {
      //   req.user.id = '5f64a79b9c6b4d2e9844f919';
      const key = `${req.user.id}/${uuid()}.jpeg`;
      const url = await s3.getSignedUrlPromise('putObject', {
        Bucket: 'blogster-app-bucket',
        ContentType: 'image/jpeg',
        Key: key
      });

      res.send({ key, url });
    } catch (err) {
      console.log(chalk.bold.bgMagenta('err'), err);
      res.send('err');
    }
  });
};
