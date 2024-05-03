
/**
 * This action is used to poll the status of a long running action
 * It is invoked with an activationId as a parameter to poll
 * or it will invoke the long-running action if no activationId is provided
 * it will return a 503 Service Unavailable if the long running action is not complete
 * It will return the result of the long running action when it is complete 200 OK
 */

let openwhisk = require("openwhisk");
async function main(params) {

  let activationId = params.activationId
  let ow = openwhisk();

  let response

  if (!activationId) {
    const activation = await ow.actions.invoke({
      name: 'dx-excshell-1/long-running', // the name of the action to invoke
      blocking: false, // this is the flag that instructs to execute the worker asynchronous
      result: true
    })
    activationId = activation.activationId
  }
  try {
    const result = await ow.activations.get(activationId)
    response = {
      statusCode: 200,
      body: result.response
    }
  }
  catch (e) {
    console.error(e)
    response = {
      statusCode: 503,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Retry-After': '2'
      },
      body: { activationId }
    }
  }
  return response
}
exports.main = main;
