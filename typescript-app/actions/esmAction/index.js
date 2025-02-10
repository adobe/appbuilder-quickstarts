import https from 'node:https'

async function getData(url) {
  return new Promise((resolve, reject) => {
    // hmm, this is a bit different from the fetch api
    https.get(url, (response) => {
        let data = ''
        response.on('data', (chunk) => {
          data += chunk
        })
        response.on('end', () => {
          resolve(data)
        })
      })
      .on('error', (error) => {
        reject(error)
      })
  })
}

export async function main (params) {
  const data = await getData('https://adobeioruntime.net')
  const result = {
    statusCode: 200,
    body: 'this is an esm action',
    params,
    data

  }

  return result
}
