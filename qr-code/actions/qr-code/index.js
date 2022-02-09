/*
 * Copyright 2022 Adobe Inc. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
*/

 const fetch = require('node-fetch')
 const { Core } = require('@adobe/aio-sdk')
 const { errorResponse, getBearerToken, stringParameters, checkMissingRequestInputs } = require('../utils')
 const QRCode = require('qrcode')
 
 // main function that will be executed by Adobe I/O Runtime
 async function main (params) {
   // create a Logger
   const logger = Core.Logger('main', { level: params.LOG_LEVEL || 'info' })
 
   try {
 
     // log parameters, only if params.LOG_LEVEL === 'debug'
     logger.debug(stringParameters(params))
 
     // check for missing request input parameters and headers
     // const requiredParams = [/* add required params */]
     // const requiredHeaders = ['Authorization']
     // const errorMessage = checkMissingRequestInputs(params, requiredParams, requiredHeaders)
     // if (errorMessage) {
     //   // return and log client errors
     //   return errorResponse(400, errorMessage, logger)
     // }
 
     // extract the user Bearer token from the Authorization header
     // const token = getBearerToken(params)
 
     // replace this with the api you want to access
     const apiEndpoint = params.url || 'https://adobeioruntime.net/api/v1/api-docs'
 
     const res = await QRCode.toDataURL(apiEndpoint)
     logger.debug('res = ', apiEndpoint)
     const response = {
       statusCode: 200,
       body: `<img src='${res}' height='300' width='300'/>`
     }
     return response
   } catch (error) {
     // log any server errors
     logger.error(error)
     // return with 500
     return errorResponse(500, 'server error', logger)
   }
 }
 
 exports.main = main