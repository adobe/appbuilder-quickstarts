const NextServer = require('next/dist/server/next-server').default;
const path = require('path');
const { expressify } = require('@adobe/openwhisk-action-utils');

async function main(params) {
  try {
    const next = new NextServer({
      hostname: HOSTNAME,
      port: 80,
      dir: path.join(__dirname),
      dev: false,
      conf: NEXTJS_CONFIGURATION
    });
  
    const handler = next.getRequestHandler();
  
    const res = await expressify(handler)(params);
  
    // See https://github.com/adobe/openwhisk-action-utils/issues/213
    if (res.multiValueHeaders) {
      res.headers = {
        ...res.headers,
        ...res.multiValueHeaders
      };
      delete res.multiValueHeaders;
    }
    
    return res;
  }
  catch (error) {
    return {
      error: {
        statusCode: 500,
        body: {
          error: error.toString()
        }
      }
    };
  }
}

exports.main = main;
