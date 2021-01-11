const { Storage } = require('@google-cloud/storage')

const storage = new Storage()

const {
  uploadStorageBucket,
  filenamePrefixes: {
    upload: uploadPrefix,
  },
} = require('../config')

const bucketSetCors = bucketName => storage
  .bucket(bucketName)
  .setCorsConfiguration([{
    origin: ['*'],
    method: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    responseHeader: [
      'Content-Type',
      'x-goog-resumable',
      'Access-Control-Allow-Origin',
    ],
  }])

const createSignedUpload = async (filename, extension) => {
  const signatureOptions = {
    version: 'v4',
    action: 'write',
    expires: Date.now() + 1 * 60 * 1000,
  }
  try {
    const file = `${uploadPrefix}/${filename}.${extension}`
    bucketSetCors(uploadStorageBucket)
    const [uploadURL] = await storage
      .bucket(uploadStorageBucket)
      .file(file)
      .getSignedUrl(signatureOptions)
    return [{ uploadURL, filename: file }, null]
  } catch (err) {
    return [null, err]
  }
}

module.exports = {
  createSignedUpload,
}
