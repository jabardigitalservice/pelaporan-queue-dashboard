const { histories, author } = require('./lookup')
const { sectionIdentity, sectionInfo, sectionClinic } = require('./case_column')
const { columnIdentity, columnInfo, columnAuthor } = require('./select_column')
const {
  checkExistColumn, checkDiagnosis, dateFilter, checkDiseases
} = require('../../utils')

const excellOutput = (this_) => ({
  'Kode Kasus': checkExistColumn(this_.id),
  ...sectionIdentity(this_),
  ...sectionInfo(this_),
  ...checkDiagnosis(this_.diagnosis),
  'Gejala Lainnya': checkExistColumn(this_.diagnosis_other),
  ...checkDiseases(this_.diseases),
  ...sectionClinic(this_)
})

const sqlCaseExport = (params, search, query) => {
  const searching = Object.keys(search).length === 0 ? [search] : search
  const createdAt = dateFilter(query, 'createdAt')
  const andParam = { ...createdAt, ...params }
  return [
    {
      $match: {
        $and: [andParam],
        $or: searching
      }
    },
    { ...author }, { ...histories },
    { $unwind: '$author_list' }, { $unwind: '$history_list' },
    {
      $project: {
        ...columnInfo,
        ...columnIdentity,
        ...columnAuthor
      }
    }
  ]
}

module.exports = {
  excellOutput, sqlCaseExport
}
