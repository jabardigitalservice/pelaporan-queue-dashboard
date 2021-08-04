const mongoose = require('mongoose')

const HistorySchema = new mongoose.Schema()

module.exports = mongoose.model('History', HistorySchema)
