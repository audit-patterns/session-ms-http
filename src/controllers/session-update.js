const {
  fetchSession,
  updateSession,
} = require('../services/data-access')

const sessionUpdate = async (req, res) => {
  const { user, params, body } = req
  const { sessionId } = params
  try {
    const [session, fetchErr] = await fetchSession(sessionId)
    if (fetchErr) throw new Error({ err: fetchErr, status: 500 })
    const { uid } = user
    if (session.uid !== uid) throw new Error({ err: 'unauthorized/invalid-uid', status: 403 })
    const [, updateError] = await updateSession(sessionId, body)
    if (updateError) throw new Error({ err: fetchErr, status: 500 })
    return res.sendStatus(200)
  } catch ({ err, status }) {
    console.error(err)
    return res.sendStatus(status)
  }
}

module.exports = sessionUpdate
