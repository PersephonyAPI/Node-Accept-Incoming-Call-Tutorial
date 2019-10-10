require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const persephonySDK = require('@persephony/sdk')

app.use(bodyParser.json())
var port = process.env.PORT || 3000
const persephony = persephonySDK()

// Handles incoming calls
app.post('/incomingCall', (req, res) => {

  // Create PerCL say script 
  const say = persephony.percl.say('Hello. Thank you for invoking the accept incoming call tutorial.')

  // Create PerCL pause script with a duration of 100 milliseconds
  const pause = persephony.percl.pause(100)

  // Create PerCL say script
  const sayGoodbye = persephony.percl.say('Goodbye')

  // Create PerCL hangup script
  const hangup = persephony.percl.hangup()

  // Build scripts
  const percl = persephony.percl.build(say, pause, sayGoodbye, hangup)

  // Convert PerCL container to JSON and append to response
  res.status(200).json(percl)
})

// Specify this route with 'Status Callback URL' in App Config
app.post('/status', (req, res) => {
  // handle status changes
  res.status(200)
})

app.listen(port, () => {
  console.log(`Starting server on port ${port}`)
})