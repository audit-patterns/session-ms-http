const admin = require('firebase-admin')

const db = admin.firestore()

const {
  collections: {
    sessions,
  },
  sessionTemplate,
} = require('../config')

const newSession = async (id, uid) => {
  try {
    const payload = {
      ...sessionTemplate,
      id,
      uid,
    }
    await db.collection(sessions).doc(id).set(payload)
    return [payload, null]
  } catch (err) {
    return [null, err]
  }
}

module.exports = {
  newSession,
}
