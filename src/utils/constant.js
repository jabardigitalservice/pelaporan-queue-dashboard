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
  GENDER: {
    MALE: 'L',
    FEMALE: 'P',
    M: 'male',
    F: 'female',
    ID_L: 'Laki-Laki',
    ID_P: 'Perempuan'
  },
  PATIENT_STATUS: {
    NEGATIVE: 'Negatif',
    DONE: 'Selesai Isolasi/Sembuh',
    DEAD: 'Meninggal',
    DISCARDED: 'Discarded',
    SICK: 'Masih Sakit',
    QUARANTINED: 'Masih Dikarantina'
  },
  CRITERIA: {
    CLOSE: 'CLOSECONTACT',
    SUS: 'SUSPECT',
    PROB: 'PROBABLE',
    CONF: 'CONFIRMATION',
    CLOSE_ID: 'Kontak Erat',
    SUS_ID: 'Suspek',
    PROB_ID: 'Probable',
    CONF_ID: 'Konfirmasi',
  },
  PYSICHAL: {
    SEDENTER: 'Sedenter',
    SMALLER_150MINUTE: 'Latihan fisik < 150 menit',
    GREATHER_150MINUTE: 'Latihan fisik > 150 menit'
  },
  DIAGNOSIS: {
    FEVER: 'DEMAM',
    COUGH: 'Batuk',
    FLU: 'Pilek',
    SORE_THROAT: 'Sakit Tenggorokan',
    HEADACHE: 'Sakit Kepala',
    BLOWN: 'Sesak Napas',
    SHIVER: 'Menggigil',
    WEAK: 'Lemah (malaise)',
    MUSCLE_ACHE: 'Nyeri Otot',
    NAUSEA: 'Mual atau Muntah',
    ABDOMENT_PAIN: 'Nyeri Abdomen',
    DIARRHEA: 'Diare'
  },
  INCOME: {
    NO_INCONME: 'Tidak ber penghasilan',
    SMALLER: '< 1juta',
    ONE_TO3: '1 s/d 3 juta',
    THREET_O5: '3 s/d 5 juta',
    GREATHER_5: '> 5juta'
  },
  DISEASES: {
    PREGNANT: 'Hamil',
    DIABETES: 'Diabetes',
    HEART_DISEASE: 'Penyakit Jantung',
    HYPERTENSION: 'Hipertensi',
    MALIGNANCY: 'Keganasan',
    IMMUNOLOGICAL_DISORDERS: 'Gangguan Imunologi',
    CHRONIC_KIDNEY_FAILURE: 'Gagal Ginjal Kronis',
    CHRONIC_HEART_FAILURE: 'Gagal Hati Kronis',
    PPOK: 'PPOK',
  },
  ANSWER: {
    YES: 'Yes',
    NO: 'No',
    YA: 'Ya',
    TIDAK: 'Tidak',
    TIDAK_TAHU: 'Tidak Tahu'
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
  },
  ROLE: {
    ADMIN: 'superadmin',
    PROVINCE: 'dinkesprov',
    KOTAKAB: 'dinkeskota',
    FASKES: 'faskes',
  },
  WHERE_GLOBAL: {
    delete_status: { $ne: 'deleted' },
    verified_status: 'verified',
    is_west_java: { $ne: false },
  }
}
