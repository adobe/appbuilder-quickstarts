const { Core } = require('@adobe/aio-sdk')
const { errorResponse, stringParameters, checkMissingRequestInputs } = require('../utils')
const filesLib = require('@adobe/aio-lib-files')
const { rosterFile, initialRoster } = require('../constants')

// main function that will be executed by Adobe I/O Runtime
async function main(params) {
    // create a Logger
    const logger = Core.Logger('main', { level: params.LOG_LEVEL || 'info' })
    const files = await filesLib.init()

    try {
        // 'info' is the default level if not set
        logger.info('Calling the main action')

        // log parameters, only if params.LOG_LEVEL === 'debug'
        logger.debug(stringParameters(params))

        // check for missing request input parameters and headers
        const requiredParams = ['id']
        const requiredHeaders = []
        const errorMessage = checkMissingRequestInputs(params, requiredParams, requiredHeaders)
        if (errorMessage) {
            // return and log client errors
            return errorResponse(400, errorMessage, logger)
        }

        // get the roster from the file
        let roster
        try {
            const rosterStr = await files.read(rosterFile)
            roster = JSON.parse(rosterStr)
        } catch (err) {
            // if the file does not exist, initialize it with some initial players
            if (err.message.includes('does not exist')) {
                roster = initialRoster
            }
        }

        // remove the player from the roster
        const index = roster.findIndex(player => player.id === params.id)
        if (index === -1) {
            return errorResponse(404, 'player not found', logger)
        }
        roster.splice(index, 1)
        await files.write(rosterFile, JSON.stringify(roster, null, 2))

        const response = {
            statusCode: 200,
            body: {
                team: roster
            }
        }

        // log the response status code
        logger.info(`${response.statusCode}: successful request`)
        return response
    } catch (error) {
        // log any server errors
        logger.error(error)
        // return with 500
        return errorResponse(500, error.message, logger)
    }
}

exports.main = main
