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
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    await db.collection(sessions).doc(id).set(payload)
    return [payload, null]
  } catch (err) {
    return [null, err]
  }
}

const fetchSession = async (id) => {
  try {
    const session = await db.collection(sessions).doc(id).get()
    const sessionData = session.data()
    return [sessionData, null]
  } catch (err) {
    return [null, err]
  }
}

const updateSession = async (id, payload) => {
  try {
    await db.collection(sessions).doc(id).update({
      ...payload,
      updatedAt: new Date(),
    })
    return [true, null]
  } catch (err) {
    return [null, err]
  }
}

module.exports = {
  newSession,
  fetchSession,
  updateSession,
}
