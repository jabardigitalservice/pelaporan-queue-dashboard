const {
  checkExistColumn, checkDiagnosis, checkDiseases, sortCondition
} = require('../../utils')
const { casesHistory, author } = require('./lookup')
const { columnIdentityClinic, columnInfo, columnAuthor } = require('./select_column')
const { combineInfo, sectionOthers } = require('./history_column')

const excellHistories = (this_) => {
  const mapingColumn = {
    ...combineInfo(this_),
    ...checkDiagnosis(this_.diagnosis),
    'Gejala Lainnya': checkExistColumn(this_.diagnosis_other),
    ...checkDiseases(this_.diseases),
    ...sectionOthers(this_),
  }

  return mapingColumn
}

const condition = (params, search, query) => {
  const limit = +query?.limit || 100
  const page = +query?.page || 1
  const searching = Object.keys(search).length === 0 ? [search] : search
  const sort = sortCondition(query)
  // let createdAt = dateFilter(query, "createdAt")
  const andParam = { ...params }
  return [
    { $match: { $and: [andParam], $or: searching } },
    { ...casesHistory }, { ...author },
    { $sort: sort },
    { $skip: (limit * page) - limit }, { $limit: limit },
    {
      $project: {
        histories: {
          ...columnInfo,
          ...columnIdentityClinic,
          ...columnAuthor
        }
      }
    },
    {
      $unwind: '$histories'
    },
    { $replaceRoot: { newRoot: '$histories' } }
  ]
}

const sqlHistoriesExport = (params, search, query) => {
  const searching = Object.keys(search).length == 0 ? [search] : search
  const andParam = { ...params }
  return [
    { $match: { $and: [andParam], $or: searching } },
    { ...casesHistory }, { ...author }, { $sort: { id: 1 } },
    {
      $project: {
        histories: {
          ...columnInfo,
          ...columnIdentityClinic,
          ...columnAuthor
        }
      }
    },
    {
      $unwind: '$histories'
    },
    { $replaceRoot: { newRoot: '$histories' } }
  ]
}

module.exports = {
  excellHistories, condition, sqlHistoriesExport
}
