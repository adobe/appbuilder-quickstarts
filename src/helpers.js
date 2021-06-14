/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const loggerNamespace = '@{{REPO}}'
const logger = require('@adobe/aio-lib-core-logging')(loggerNamespace, { level: process.env.LOG_LEVEL })

/* global Request, Response */ // for linter

/**
 * Reduce an Error to a string
 *
 * @private
 * @param {Error} error the Error object to reduce
 * @returns {string} string reduced from an Error
 */
function reduceError (error = {}) {
  const response = error.response
  if (response) {
    if (response.status && response.statusText && response.body) {
      return `${response.status} - ${response.statusText} (${JSON.stringify(response.body)})`
    }
  }

  return error
}

/**
 * Create request options for openapi client
 *
 * @private
 * @param {object} parameters object
 * @returns {object}  options request options
 */
function createRequestOptions ({ tenantId, apiKey, accessToken, body = {} }) {
  return {
    requestBody: body,
    securities: {
      authorized: {
        BearerAuth: { value: accessToken },
        ApiKeyAuth: { value: apiKey }
      }
    }
  }
}

/**
 * Converts a fetch Response object's body contents to a string.
 *
 * @param {Response} response the response object
 * @returns {Promise<string>} a Promise that resolves to the converted object's body contents
 */
async function responseBodyToString (response) {
  try {
    // work with differences in the Response object processed by swagger vs straight fetch
    if (typeof response.text === 'function') {
      const _res = response.clone() // work around 'body already consumed' issues
      return _res.text()
    } else {
      return response.text
    }
  } catch (error) {
    return Promise.reject(error.toString())
  }
}

/**
 * Filters a json object, removing any undefined or null entries.
 * Returns a new object (does not mutate original)
 *
 * @param {object} json the json object to filter
 * @returns {object} the filtered object (a new object)
 */
function filterUndefinedOrNull (json) {
  return Object.entries(json).reduce((accum, [key, value]) => {
    if (value == null) { // undefined or null
      return accum
    } else {
      return { ...accum, [key]: value }
    }
  }, {})
}

/**
 * Converts a fetch Request object to a string.
 *
 * @param {Request} request the request object
 * @returns {object} the converted object
 */
function requestToString (request) {
  try {
    const { method, headers, url, credentials, body } = request
    const json = { method, headers, url, credentials, body }

    // work with differences in the Request object processed by swagger vs straight fetch
    if (request.headers && request.headers.forEach && typeof request.headers.forEach === 'function') {
      json.headers = {}
      request.headers.forEach((value, key) => {
        json.headers[key] = value
      })
    }

    return JSON.stringify(filterUndefinedOrNull(json), null, 2)
  } catch (error) {
    return error.toString()
  }
}

/**
 * A request interceptor that logs the request
 *
 * @private
 * @param {Request} request the request object
 * @returns {Request} the request object
 */
function requestInterceptor (request) {
  logger.debug(`REQUEST:\n ${requestToString(request)}`)
  return request
}

/**
 * A request interceptor that logs the request
 *
 * @private
 * @param {Response} response the response object
 * @returns {Response} the response object
 */
async function responseInterceptor (response) {
  logger.debug(`RESPONSE:\n ${await responseBodyToString(response)}`)
  return response
}

module.exports = {
  responseBodyToString,
  requestToString,
  createRequestOptions,
  requestInterceptor,
  responseInterceptor,
  reduceError
}
