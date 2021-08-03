/* eslint-disable global-require */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
const result = []
const {
  PATIENT_STATUS, CRITERIA, ANSWER,
  PYSICHAL, INCOME, DIAGNOSIS,
  DISEASES
} = require('./constant')

const dynamicColumnCreate = (method, payload) => {
  for (const i in method) {
    result.push({
      [method[i]]: payload[method[i]]
    })
  }

  return Object.assign({}, ...result)
}

const convertDate = (dates) => {
  const moment = require('moment')

  return moment(dates).format('YYYY/MM/DD')
}

const patientStatus = (params) => {
  let finalResult
  switch (params) {
    case '0': finalResult = PATIENT_STATUS.NEGATIVE; break;
    case '1': finalResult = PATIENT_STATUS.DONE; break;
    case '2': finalResult = PATIENT_STATUS.DEAD; break;
    case '3': finalResult = PATIENT_STATUS.DISCARDED; break;
    case '4': finalResult = PATIENT_STATUS.SICK; break;
    case '5': finalResult = PATIENT_STATUS.QUARANTINED; break;
    default: finalResult = '';
  }

  return finalResult
}

const criteriaConvert = (status) => {
  let criteria
  if (status === CRITERIA.CONF) {
    criteria = CRITERIA.CONF_ID
  } else if (status === CRITERIA.PROB) {
    criteria = CRITERIA.PROB_ID
  } else if (status === CRITERIA.SUS) {
    criteria = CRITERIA.SUS_ID
  } else if (status === CRITERIA.CLOSE) {
    criteria = CRITERIA.CLOSE_ID
  } else {
    criteria = ''
  }

  return criteria
}

const convertYesOrNO = (param) => {
  let res
  if (param === 1) {
    res = ANSWER.YA
  } else if (param === 2) {
    res = ANSWER.TIDAK
  } else if (param === 3) {
    res = ANSWER.TIDAK_TAHU
  } else {
    res = ''
  }

  return res
}

const yesOrNoBool = (param) => {
  let res
  if (param) {
    res = ANSWER.YA
  } else {
    res = ANSWER.TIDAK
  }

  return res
}

const convertIncome = (param) => {
  let res
  switch (param) {
    case 0: res = INCOME.NO_INCONME; break;
    case 1: res = INCOME.SMALLER; break;
    case 2: res = INCOME.ONE_TO3; break;
    case 3: res = INCOME.THREET_O5; break;
    case 4: res = INCOME.GREATHER_5; break;
    default: res = '';
  }

  return res
}

const convertPysichal = (param) => {
  let res
  switch (param) {
    case 0: res = PYSICHAL.SEDENTER; break;
    case 1: res = PYSICHAL.SMALLER_150MINUTE; break;
    case 2: res = PYSICHAL.GREATHER_150MINUTE; break;
    default: res = '';
  }

  return res
}

const checkExistColumn = (param) => (param || '')

const checkDiagnosis = (data) => ({
  Demam: yesOrNoBool(data.includes(DIAGNOSIS.FEVER)),
  Batuk: yesOrNoBool(data.includes(DIAGNOSIS.COUGH)),
  Pilek: yesOrNoBool(data.includes(DIAGNOSIS.FLU)),
  'Sakit Tenggorokan': yesOrNoBool(data.includes(DIAGNOSIS.SORE_THROAT)),
  'Sakit Kepala': yesOrNoBool(data.includes(DIAGNOSIS.HEADACHE)),
  'Sesak Napas': yesOrNoBool(data.includes(DIAGNOSIS.BLOWN)),
  Menggigil: yesOrNoBool(data.includes(DIAGNOSIS.SHIVER)),
  'Lemah (malaise)': yesOrNoBool(data.includes(DIAGNOSIS.WEAK)),
  'Nyeri Otot': yesOrNoBool(data.includes(DIAGNOSIS.MUSCLE_ACHE)),
  'Mual atau Muntah': yesOrNoBool(data.includes(DIAGNOSIS.NAUSEA)),
  'Nyeri Abdomen': yesOrNoBool(data.includes(DIAGNOSIS.ABDOMENT_PAIN)),
  Diare: yesOrNoBool(data.includes(DIAGNOSIS.DIARRHEA))
})

const checkDiseases = (data) => ({
  Hamil: yesOrNoBool(data.includes(DISEASES.PREGNANT)),
  Diabetes: yesOrNoBool(data.includes(DISEASES.DIABETES)),
  'Penyakit Jantung': yesOrNoBool(data.includes(DISEASES.HEART_DISEASE)),
  Hipertensi: yesOrNoBool(data.includes(DISEASES.HYPERTENSION)),
  Keganasan: yesOrNoBool(data.includes(DISEASES.MALIGNANCY)),
  'Gangguan Imunologi': yesOrNoBool(data.includes(DISEASES.IMMUNOLOGICAL_DISORDERS)),
  'Gagal Ginjal Kronis': yesOrNoBool(data.includes(DISEASES.CHRONIC_KIDNEY_FAILURE)),
  'Gagal Hati Kronis': yesOrNoBool(data.includes(DISEASES.CHRONIC_HEART_FAILURE)),
  PPOK: yesOrNoBool(data.includes(DISEASES.PPOK))
})

const locationPatient = (location, locationName) => {
  const res = {}
  if (location === 'RS') {
    res.bool = ANSWER.YA
    res.location_name = locationName
  } else {
    res.bool = ANSWER.TIDAK
    res.location_name = ''
  }
  return res
}

const dateReplace = (date) => {
  const searchRegExp = new RegExp('/', 'g')
  const queryDate = date
  const searchDate = queryDate.replace(searchRegExp, '-')
  return searchDate
}

const searchRegExp = new RegExp('/', 'g')

const setDate = (columnDate, minDate, maxDate) => {
  return {
    [columnDate]: {
      "$gte": new Date(new Date(minDate).setHours(00, 00, 00)),
      "$lt": new Date(new Date(maxDate).setHours(23, 59, 59))
    }
  }
}

const dateFilter = (query, columnDate) => {
  let dates = {}
  if (query.min_date && query.max_date) {
    let min = query.min_date
    let max = query.max_date
    let minDate = min.replace(searchRegExp, '-')
    let maxDate = max.replace(searchRegExp, '-')
    dates = setDate(columnDate, minDate, maxDate)
  }

  return dates
}

const oneDate = (query, columnDate) => {
  let dates = {}
  if (query.start_date) {
    let search = query.start_date
    let searchDate = search.replace(searchRegExp, '-')
    dates = setDate(columnDate, searchDate, searchDate)
  }

  return dates
}

module.exports = {
  convertDate,
  patientStatus,
  criteriaConvert,
  convertYesOrNO,
  convertIncome,
  convertPysichal,
  checkDiagnosis,
  checkDiseases,
  checkExistColumn,
  locationPatient,
  yesOrNoBool,
  dateReplace,
  dynamicColumnCreate,
  setDate, dateFilter, oneDate
}
