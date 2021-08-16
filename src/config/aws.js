/* eslint-disable no-unused-vars */
const AWS = require('aws-sdk')
const Sentry = require('@sentry/node')

// Initializing S3 Interface
const awsBucket = new AWS.S3({
  accessKeyId: process.env.AWS_BUCKET_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY
})

const uploadFileToAwsBucket = (fileName, fileContent, bucketName) => {
  const params = {
    Bucket: bucketName,
    Key: fileName,
    Body: fileContent
  };

  // Uploading files to the bucket
  awsBucket.upload(params, (err, _data) => {
    if (err) {
      Sentry.captureException(err)
      throw err
    }
  });
};

// eslint-disable-next-line no-return-await
const readFromBucket = async (Bucket, Key) => await awsBucket.getObject({ Bucket, Key }).promise()

// eslint-disable-next-line consistent-return
const getSingedUrl = async (Bucket, Key) => {
  const params = {
    Bucket, Key, Expires: 7200 // expire in 2 hours
  };
  try {
    const url = await new Promise((resolve, reject) => {
      // eslint-disable-next-line no-shadow
      awsBucket.getSignedUrl('getObject', params, (err, url) => {
        // eslint-disable-next-line no-unused-expressions
        err ? reject(err) : resolve(url);
      });
    });
    return url
  } catch (err) {
    Sentry.captureException(err)
  }
}

module.exports = {
  uploadFileToAwsBucket, readFromBucket, getSingedUrl
}
