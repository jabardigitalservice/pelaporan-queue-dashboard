const json2xls = require('json2xls')
const moment = require('moment')
const fs = require('fs')
const { createLogStatus } = require('./log')
const { uploadFileToAwsBucket } = require('../config')

const checkBucketName = (pathFolder) => {
  let bucketName
  if (pathFolder === 'cases') {
    bucketName = process.env.CASE_BUCKET_NAME
  } else {
    bucketName = process.env.HISTORY_BUCKET_NAME
  }

  return bucketName
}

const generateExcellPath = async (data, title, fullName, pathFolder, jobId) => {
  try {
    const fileName = `${title}-${fullName}-${moment().format('YYYY-MM-DD-HH-mm')}-${jobId}.xlsx`
    const path = `./tmp/${pathFolder}/${fileName}`
    const jsonXls = json2xls(data)
    const bucketName = checkBucketName(pathFolder)
    fs.writeFileSync(path, jsonXls, 'binary')
    uploadFileToAwsBucket(fileName, fs.createReadStream(path), bucketName)
    const set = {
      'message.generate': 'Upload succes',
      file_name: fileName,
      path: bucketName,
      job_progress: 50
    }
    await createLogStatus(jobId, set)
    fs.unlinkSync(path)
    return { filename: fileName, path, data: jsonXls }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.info(error)
    const set = { 'message.generate': error.toString(), job_progress: 50, job_status: 'Error' }
    await createLogStatus(jobId, set)
    return error
  }
}

module.exports = { generateExcellPath }
