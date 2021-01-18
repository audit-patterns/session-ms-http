const uploadStorageBucket = 'audit-patterns.appspot.com'

module.exports = {
  collections: {
    sessions: 'sessions',
  },
  uploadStorageBucket,
  filenamePrefixes: {
    upload: 'uploads',
    csv: 'all-csvs',
    summary: 'results',
  },
  sessionTemplate: {
    id: null,
    uid: null,
    files: {
      storageBucket: uploadStorageBucket,
      upload: null,
      csv: null,
      summary: null,
    },
    originalCols: [],
    availableCols: [],
    mappedCols: { // PENDING
    },
    parametersIRS: {
    },
  },
  aggregationFormulas: {
    sum: (i, j) => (i + j),
  },
}
