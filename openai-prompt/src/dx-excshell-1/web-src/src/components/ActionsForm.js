/* 
* <license header>
*/

import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Flex,
  Heading,
  ActionButton,
  Button,
  StatusLight,
  ProgressCircle,
  Text,
  View
} from '@adobe/react-spectrum'

import allActions from '../config.json'
import actionWebInvoke from '../utils'

// remove the deprecated key
const actions = Object.keys(allActions).reduce((obj, key) => {
  if (key.lastIndexOf('/') > -1) {
    obj[key] = allActions[key]
  }
  return obj
}, {})

const ActionsForm = (props) => {
  const [state, setState] = useState({
    actionSelected: null,
    actionResponse: null,
    actionResponseError: null,
    actionHeaders: null,
    actionHeadersValid: null,
    actionParams: null,
    actionParamsValid: null,
    actionInvokeInProgress: false,
    actionResult: ''
  })

  return (
    <View backgroundColor="seafoam-400">
      <Flex direction="column" gap="size-200" alignItems="center">
      <Heading width="size-3000" level={2}>Bandname Generator</Heading>
      <Text width="size-3000">Click the button below to use the OpenAI API and an LLM to do something that could be done in 5 lines of JavaScript</Text>
      <Button
        variant="primary"
        style="fill"
        staticColor="white"
        width="size-3000"
        onPress={invokeAction.bind(this)}
        isDisabled={state.actionInvokeInProgress}
      ><Text>Generate Band Name</Text>
      </Button>

      <ProgressCircle
        aria-label="loading"
        isIndeterminate
        isHidden={!state.actionInvokeInProgress}
        marginStart="size-100"
      />

      {state.actionResponseError && (
        <View padding={'size-100'} marginTop={'size-100'} marginBottom={'size-100'} borderRadius={'small '}>
          <StatusLight variant="negative">{state.actionResponseError}</StatusLight>
        </View>
      )}
      {!state.actionResponseError && state.actionResponse && (
        <View padding={'size-100'} marginTop={'size-100'} marginBottom={'size-100'} borderRadius={'small '}>
        {!state.actionInvokeInProgress && (
          <>
            <Text>Success! Check out this hot new band!</Text>
            <Heading level={1}><i>{state.actionResult}</i></Heading>
          </>
        )}
        {state.actionInvokeInProgress && (
          <>
            <Text>Using the full power ChatGPT to generate a band name for you!</Text>
          </>
        )}
        </View>
      )}
      <Text></Text>
      </Flex>
    </View>
  )

  // Methods

  // invokes a the selected backend actions with input headers and params
  async function invokeAction () {
    setState({ ...state, actionInvokeInProgress: true, actionResult: 'calling action ... ' })
    const startTime = Date.now()
    let formattedResult = ''
    try {
      // invoke backend action
      // this makes the backend call api with 'generate a band name, we play really good music'
      const params = {"genre": "really good"}
      const actionUrl = actions['dx-excshell-1/get-bandname']
      const actionResponse = await actionWebInvoke(actionUrl, null, params)
      console.log('action response', actionResponse)
      if (actionResponse.statusCode !== 200) {
        setState({
          ...state,
          actionResponse: null,
          actionResult: actionResponse.result,
          actionResponseError: actionResponse.error.error.message,
          actionInvokeInProgress: false
        })
        
      } else {
        // store the response
        setState({
          ...state,
          actionResponse,
          actionResult: actionResponse.result,
          actionResponseError: null,
          actionInvokeInProgress: false
        })
      }
    } catch (e) {
      // log and store any error message
      console.log('invokation error', e)
      formattedResult = `time: ${Date.now() - startTime} ms\n` + e.message
      console.error(e)
      setState({
        ...state,
        actionResponse: null,
        actionResult: formattedResult,
        actionResponseError: e.message,
        actionInvokeInProgress: false
      })
    }
  }
}

ActionsForm.propTypes = {
  runtime: PropTypes.any,
  ims: PropTypes.any
}

export default ActionsForm
