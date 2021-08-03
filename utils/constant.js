module.exports = {
  API_PATH: '/api/v1',
  SEARCH: {
    status: true
  },
  LIMIT: 5,
  PAGE: 1,
  MONGO: {
    SORT: [1, -1] // 1 = ASC -1 = DESC
  },
  SQL: {
    SORT: ['ASC', 'DESC']
  },
  MORGAN_FORMAT: '[:date[clf]] :remote-addr :remote-user \x1b[36m:method \x1b[36m:url \x1b[33m:status \x1b[32m:response-time\x1b[36m(ms)\x1b[0m',
  SUBJECT_NAME: 'Aplikasi Pelaporan Kasus Pikobar',
  TEXT_CASE: 'Berikut merupakan Data Pasien Aplikasi Pelaporan Kasus Pikobar : <br>',
  TEXT_HISTORY: 'Berikut merupakan Data Informasi Klinis Aplikasi Pelaporan Kasus Pikobar : <br>',
  EXPIRED_INFO: '<p style="color:red;">*Link berikut hanya dapat diakses selama 2 jam. Silahkan resend email pada Halaman Export ketika link expired</p>',
  REGARDS_INFO: '<p style="color:##a09a9a;">--<br>Regards <br> Jabar Digital Service</p>',
  QUEUE: {
    CASE: 'queue-export-cases',
    HISTORY: 'queue-export-histories'
  },
  JOB: {
    CASE: 'job-export-cases',
    HISTORY: 'job-export-histories'
  }
}
