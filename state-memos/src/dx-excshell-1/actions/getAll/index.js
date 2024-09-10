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

    const state = await State.init({ region: params.region })

    const allKeys = []
    for await (const { keys } of state.list({ match: MEMO_STATE_PREFIX + '*' })) {
      allKeys.push(...keys)
    }

    const memos = (await Promise.all(allKeys.map(async (key) => {

      // for each key get the value
      const ret = await state.get(key)

      // each key is in the format memo.<date_ms>, return the date as id and the value as content
      return { id: key.split(`${MEMO_STATE_PREFIX}.`)[1], content: ret.value }

    })))
      .sort((a, b) => a.id - b.id) // sort by date ascending

    logger.debug(JSON.stringify(memos))
    return {
      statusCode: 200,
      body: memos
    }
  } catch (error) {
    // log any server errors
    logger.error(error)
    // return with 500
    return errorResponse(500, 'server error', logger)
  }
}

exports.main = main
