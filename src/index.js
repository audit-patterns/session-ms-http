require('dotenv').config()

const express = require('express')
const cors = require('cors')
const admin = require('firebase-admin')

admin.initializeApp()
const authorizer = require('./middlewares/authorizer')

const sessionCreate = require('./controllers/session-create')
const sessionUpdate = require('./controllers/session-update')
const sessionFetch = require('./controllers/session-fetch')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(authorizer)

app.post('/', sessionCreate)
app.put('/:sessionId', sessionUpdate)
app.get('/:sessionId', sessionFetch)
app.use('*', (req, res) => res.sendStatus(404))

const port = process.env.PORT || 8080
app.listen(port, () => console.info(`server listening on port ${port}`))
