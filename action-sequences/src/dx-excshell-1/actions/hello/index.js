
const fetch = require('node-fetch')
const { Core, Files, State } = require('@adobe/aio-sdk')
const crypto = require('crypto')
const azure = require('@azure/storage-blob')
// const { errorResponse, getBearerToken, stringParameters, checkMissingRequestInputs } = require('../utils')

// main function that will be executed by Adobe I/O Runtime
async function main(params) {
  console.log('params is', params)
  console.log('process.env.__OW_NAMESPACE is', process.env.__OW_NAMESPACE)

  const message = `${params.salutation || 'Hello'} ${params.name || 'stranger'}!`

  console.log('returning message : ', message)



  let runCounter = { value: 0 }
  // call state lib
  if (false) {
    const stateLib = await State.init()
    try {
      runCounter = await stateLib.get('runCounter') || { value: 0 }
      console.log('runCounter = ', runCounter)
      stateLib.put('runCounter', runCounter.value + 1, { ttl: 100 })
    } catch (e) {
      console.log('ERROR getting state', e.message)
    }
  }

  // standard files, vpn only

  let fileInfo, fileResult
  // read public files, no vpn
  if (false) {

    const fileName = `public/userData/${params.name}.json`
    const files = await Files.init()
    try {

      fileResult = await files.write(fileName, 'newer new data')
      console.log('fileResult is', fileResult)
      fileInfo = await files.getProperties(fileName)
      console.log('fileInfo is', fileInfo)
    } catch (e) {
      console.log('ERROR getting file properties', e.message)
    }
    let fileContent = await files.read(fileName)
    console.log('fileContent is', fileInfo)
  }

  // private files, no vpn
  // correctly reads and writes to private files, but url is not accessible without credentials
  // private data can be reached with a presigned url
  if (true) {

    const fileName = `public/userShare/${params.name}.json`
    const files = await Files.init()
    try {

      fileResult = await files.write(fileName, 'newer new data')
      console.log('fileResult is', fileResult)
      fileInfo = await files.getProperties(fileName)
      console.log('fileInfo is', fileInfo)
      fileInfo.presignedUrl = await files.generatePresignURL(fileName, { expiryInSeconds: 600, permissions: 'rwd' })
    } catch (e) {
      console.log('ERROR getting file properties', e.message)
    }
    let fileContent = await files.read(fileName)
    console.log('fileContent is', fileInfo)
  }

  ////////////////////////
  // generate our own sas tokens, experimental for uploads
  // note requires azure storage key
  if (false) {
  const containerName = crypto.createHash('sha256').update(process.env.__OW_NAMESPACE, 'binary').digest('hex').slice(0,32)
  console.log('containerName is', containerName)
  const pubContainerName = containerName + '-public'

  // or firefly.azureedge.net
  // const accountURL = 'https://aiocnastorageprod.blob.core.windows.net'
  const accountURL = 'https://firefly.azureedge.net'
  const sharedKeyCredential = new azure.StorageSharedKeyCredential('aiocnastorageprod', process.env.AZURE_STORAGE_KEY)
  const expiryTime = new Date()
  expiryTime.setSeconds(expiryTime.getSeconds() + 60) // 60 seconds
  const permissions = new azure.ContainerSASPermissions()
  permissions.add = permissions.read = permissions.create = permissions.write = permissions.list = true
  const commonSasParams = {
    permissions: permissions.toString(),
    expiresOn: expiryTime
  }

  const sasQueryParamsPrivate = azure.generateBlobSASQueryParameters({ ...commonSasParams, containerName }, sharedKeyCredential)
  const sasQueryParamsPublic = azure.generateBlobSASQueryParameters({ ...commonSasParams, containerName: pubContainerName }, sharedKeyCredential)

  const fileName = `public/userData/${params.name}.json`
  const files = await Files.init({
    azure: {
      sasURLPrivate: `${accountURL}/${containerName}?${sasQueryParamsPrivate.toString()}`,
      sasURLPublic: `${accountURL}/${pubContainerName}?${sasQueryParamsPublic.toString()}`
    }
  })
  try {
    fileInfo = await files.getProperties(fileName)
    // fileResult = await files.write(fileName, 'newer new data')
    // console.log('fileResult is', fileResult)
  } catch (e) {
    console.log('ERROR getting file properties', e.message)
  }

  let fileContent = await files.read(fileName)
  console.log('fileContent is', fileContent)
  let fileContent2 = await files.write(fileName, fileContent + ' more data')

  const fileList = await files.list('public/')
  console.log('fileList is', fileList)
  }

  ////////////////////////
  // fetch content from external api endpoint
  // just like default generated code
  let content = null
  if(false) {
    const apiEndpoint = 'https://adobeioruntime.net/api/v1'

    console.log('making remote call to ', apiEndpoint)
    // fetch content from external api endpoint
    const res = await fetch(apiEndpoint)
    if (!res.ok) {
      throw new Error('request to ' + apiEndpoint + ' failed with status code ' + res.status)
    }
    content = await res.json()
  }

  const response = {
    statusCode: 200,
    body: {
      content,
      message,
      fileInfo,
      fileResult,
      runCounter
    }
  }

  console.log('response is ', response)
  return response
}

exports.main = main
