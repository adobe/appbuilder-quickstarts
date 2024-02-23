
// This is a simple action that returns a greeting message
async function main(params) {

  const message = `${params.salutation || 'Hello'} ${params.name || 'stranger'}!`
  const response = {
    statusCode: 200,
    body: {
      message
    }
  }
  return response
}

exports.main = main
