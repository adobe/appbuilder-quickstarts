
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