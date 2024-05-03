
/**
 * this action represents work that takes a long time to complete
 * it will return a 200 OK when the work is complete
 * since it is async, the caller needs to use the activationId to poll for completion
 */


async function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function main(args) {
  const start = Date.now();
  const later = start + 200000; // 200 seconds in the future

  return new Promise(async function(resolve, reject) {
    while (Date.now() < later) {
      await sleep(1000);
    }
    let delta = new Date(Date.now() - start).toISOString().substring(11, 19) ;
    var result = {
        statusCode: 200,
        body: {
          message: `Whew! I have completed the long running job! I spent ${delta} of my own time doing it.`
        }
    };
    resolve(result);
  })
}
exports.main = main;