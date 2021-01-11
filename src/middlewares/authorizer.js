const admin = require('firebase-admin')

const authorizer = async (req, res, next) => {
  const authHeader = req.get('authorization')
  try {
    const token = authHeader.split(' ')[1]
    req.user = await admin.auth().verifyIdToken(token)
    next()
  } catch (err) {
    return res.sendStatus(401)
  }
}

module.exports = authorizer
