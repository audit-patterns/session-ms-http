const {
  newSession,
} = require('../services/data-access')
const {
  createSignedUpload,
} = require('../services/cloud-storage')

const sessionCreate = async (req, res) => {
  const { user, body } = req
  try {
    const { uid } = user
    const {
      session_id: id,
      extension,
    } = body
    const [session, sessionError] = await newSession(id, uid)
    if (sessionError) throw new Error(sessionError)
    const [signature, signatureError] = await createSignedUpload(id, extension)
    if (signatureError) throw new Error(signatureError)
    const {
      uploadURL,
      filename,
    } = signature
    return res.status(200).json({
      ...session,
      uploadURL,
      files: {
        ...session.files,
        upload: filename,
      },
    })
  } catch (err) {
    console.error(err)
    return res.sendStatus(400)
  }
}

module.exports = sessionCreate
