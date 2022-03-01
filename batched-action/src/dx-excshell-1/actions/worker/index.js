
const fetch = require('node-fetch')
const { errorResponse } = require('../utils')

// main function that will be executed by Adobe I/O Runtime
async function main (params) {

  try {
    console.log('params = ', params.batchData)

    const response = {
      statusCode: 200,
      body: 'ok' + params.batchData
    }

    return response
  } catch (error) {
    // log any server errors
    console.error(error)
    // return with 500
    return errorResponse(500, 'server error', console.log)
  }
}

exports.main = main
