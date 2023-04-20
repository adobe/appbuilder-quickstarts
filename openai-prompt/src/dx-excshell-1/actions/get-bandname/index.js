
const fetch = require('node-fetch')
const { Core } = require('@adobe/aio-sdk')
const { errorResponse, getBearerToken, stringParameters, checkMissingRequestInputs } = require('../utils')
const { Configuration, OpenAIApi } = require('openai')


// main function that will be executed by Adobe I/O Runtime
async function main (params) {
  const logger = Core.Logger('main', { level: params.LOG_LEVEL || 'info' })


  const configuration = new Configuration({
    apiKey: params.OPENAI_API_KEY,
  });
  
  const openai = new OpenAIApi(configuration);

  if (!configuration.apiKey) {
    return errorResponse( 500, 'OpenAI API key not configured, please follow instructions in README.md', logger)
  }

  const genre = params.genre?.trim() || 'pop-rock'

  if (genre.length > 24 || genre.length < 1) {
    return errorResponse( 400, 'Please enter a valid genre, must be less than 24 letters', logger)
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "Suggest a name for my band. We play " + genre + " music.",
      temperature: 0.6,
    });

    return {
      statusCode: 200,
      result: completion.data.choices[0].text
    }

  } catch (error) {
  
    if (error.response) {
      console.error(`Error with OpenAI API request: ${error.response.data}`)
      return errorResponse(error.response.status, error.response.data, logger)
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      return errorResponse(500, 'An error occurred during your request.', logger)
    }
  }
}

exports.main = main








