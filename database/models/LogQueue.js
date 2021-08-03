const mongoose = require('mongoose')

const LogQueueSchema = new mongoose.Schema()

module.exports = mongoose.model('LogQueue', LogQueueSchema)
