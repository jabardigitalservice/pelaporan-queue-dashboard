/* eslint-disable no-return-await */
/* eslint-disable no-console */
const Case = require('../database/models/Case')
const {
  exportByRole, WHERE_GLOBAL, searchExport, filterCase, generateExcellPath
} = require('../utils')
const { sqlCaseExport, excellOutput } = require('./process/cases')
// const { sqlHistoriesExport, excellHistories } = require('../filter/historyfilter')

const sameCondition = async (job, method, allow, mapingData, name, path) => {
  try {
    // condition filter
    const filter = filterCase(job.data.user, job.data.query)
    const roleFilter = exportByRole({}, job.data.user, job.data.query)
    const params = { ...filter, ...roleFilter, ...WHERE_GLOBAL }
    params.last_history = { $exists: true, $ne: null }

    // condition search
    const search = searchExport(job.data.query)

    const condition = method(params, search, job.data.query)
    const result = await Case.aggregate(condition).allowDiskUse(allow)
    const mapingArray = result.map((cases) => mapingData(cases))

    const fullName = job.data.user.fullname.replace(/\s/g, '-')

    return await generateExcellPath(mapingArray, name, fullName, path, job)
  } catch (error) {
    console.info(error)
    return error
  }
}

const jobCaseExport = async (job) => await sameCondition(
  job, sqlCaseExport, false, excellOutput, 'Data-Pasien', 'cases',
)

const jobHistoryExport = async (job) => await sameCondition(
  query, user, sqlHistoriesExport, true, excellHistories,
  'Data-Riwayat-Klinis', 'histories', jobId
)

module.exports = {
  jobCaseExport, jobHistoryExport
}
