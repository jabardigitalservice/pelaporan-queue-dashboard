/* eslint-disable no-return-await */
/* eslint-disable no-console */
const Case = require('../database/models/Case')
const {
  exportByRole, WHERE_GLOBAL, searchExport, filterCase, generateExcellPath
} = require('../utils')
const { sqlCaseExport, excellOutput } = require('./process/cases')
// const { sqlHistoriesExport, excellHistories } = require('../filter/historyfilter')

const sameCondition = async (query, user, method, allow, mapingData, name, path, jobId) => {
  try {
    // condition filter
    const filter = filterCase(user, query)
    const roleFilter = exportByRole({}, user, query)
    const params = { ...filter, ...roleFilter, ...WHERE_GLOBAL }
    params.last_history = { $exists: true, $ne: null }

    // condition search
    const search = searchExport(query)

    const condition = method(params, search, query)
    const result = await Case.aggregate(condition).allowDiskUse(allow)
    const mapingArray = result.map((cases) => mapingData(cases))

    const fullName = user.fullname.replace(/\s/g, '-')

    return await generateExcellPath(mapingArray, name, fullName, path, jobId)
  } catch (error) {
    console.info(error)
    return error
  }
}

const jobCaseExport = async (query, user, jobId) => await sameCondition(
  query, user, sqlCaseExport, false, excellOutput,
  'Data-Pasien', 'cases', jobId
)

const jobHistoryExport = async (query, user, jobId) => await sameCondition(
  query, user, sqlHistoriesExport, true, excellHistories,
  'Data-Riwayat-Klinis', 'histories', jobId
)

module.exports = {
  jobCaseExport, jobHistoryExport
}
