
const fetch = require('node-fetch')
const process = require('process')
const { errorResponse } = require('../utils')

let deferredCalls = []

console.log('process launched ', process.argv)

// process.on('beforeExit', (code) => {
//   console.error('Process beforeExit event with code: ', code)
// })

// process.on('exit', (code) => {
//   console.error(`About to exit with code: ${code}`)
// })

// process.on('warning', (warning) => {
//   console.error(warning.name)   // Print the warning name
//   console.error(warning.message) // Print the warning message
//   console.error(warning.stack)  // Print the stack trace
// })

// note that logging here just disappears, logs are tied to the activation which has ended
async function processBatch(code = 0, eventName) {
  // grab em all, and clear for use
  const batch = deferredCalls.slice()
  deferredCalls = []
  const response = await fetch('https://23294-multiappjm-stage.adobeio-static.net/api/v1/web/dx-excshell-1/worker', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-ow-extra-logging': 'on'
    },
    body: JSON.stringify({ code, eventName, batchData: batch.join('\n') })
  })
}



// main function that will be executed by Adobe I/O Runtime
async function main (params) {
  let startedTimer = false
  try {
    if( deferredCalls.length < 1) {
      startedTimer = true
      setTimeout(processBatch, 90000 ) // 90 seconds
      // note: none of these ever fire ...
      /*
      process.on('beforeExit', (code) => {
        processBatch(code, 'beforeExit')
      })
      process.on('exit', (code) => {
        processBatch(code, 'exit')
      })
      process.on('disconnect', (code) => {
        processBatch(code, 'disconnect')
      })
      */
    }
    deferredCalls.push(`activationId:${process.env.__OW_ACTIVATION_ID}` )
    const response = {
      statusCode: 200,
      body: {
        activationId: process.env.__OW_ACTIVATION_ID,
        length: deferredCalls.length,
        startedTimer
      }
    }
    return response
  } catch (error) {
    // log any server errors
    console.error(error)
    // return with 500
    return errorResponse(500, 'server error')
  }
}

exports.main = main
