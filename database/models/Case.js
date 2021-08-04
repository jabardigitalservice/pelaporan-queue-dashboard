const mongoose = require('mongoose')

const CaseSchema = new mongoose.Schema()

module.exports = mongoose.model('Case', CaseSchema)
