const uploadStorageBucket = 'audit-patterns.appspot.com'

module.exports = {
  collections: {
    sessions: 'sessions',
  },
  uploadStorageBucket,
  filenamePrefixes: {
    upload: 'upload',
    csv: 'csv',
    summary: 'summary',
  },
  sessionTemplate: {
    id: null,
    uid: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    mappedCols: { // PENDING
    },
    files: {
      storageBucket: uploadStorageBucket,
      upload: null,
      csv: null,
      summary: null,
    },
    parametersIRS: { // PENDING
    },
    originalCols: [],
    availableCols: [],
  },
  aggregationFormulas: {
    sum: (i, j) => (i + j),
  },
}
