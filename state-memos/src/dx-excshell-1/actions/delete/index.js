/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/


const { Core, State } = require('@adobe/aio-sdk')
const { errorResponse, stringParameters, checkMissingRequestInputs } = require('../utils')
const { MEMO_STATE_PREFIX } = require('../constants')

// main function that will be executed by Adobe I/O Runtime
async function main (params) {
  // create a Logger
  const logger = Core.Logger('main', { level: params.LOG_LEVEL || 'info' })

  try {
    logger.info(stringParameters(params))

    // check for missing request input parameters and headers
    const requiredParams = ['region']
    const errorMessage = checkMissingRequestInputs(params, requiredParams, [])
    if (errorMessage) {
      // return and log client errors
      return errorResponse(400, errorMessage, logger)
    }

    if (params.all === undefined && params.id === undefined) {
      throw new Error('either all or id parameter must be set')
    }

    const state = await State.init({ region: params.region })

    if (params.all) {
      const { keys } = await state.deleteAll({ match: MEMO_STATE_PREFIX + '*' })
      console.log(`deleted ${keys} keys`)
      return {
        statusCode: 200,
        body: { keys }
      }
    }

    const ret = (await state.delete(`${MEMO_STATE_PREFIX}.${params.id}`)) ? { keys: 1 }: { keys: 0 }
    console.log(`deleted ${ret.keys} keys`)
    return {
      statusCode: 200,
      body: ret
    }
  } catch (error) {
    // log any server errors
    logger.error(error)
    // return with 500
    return errorResponse(500, 'server error', logger)
  }
}

exports.main = main
