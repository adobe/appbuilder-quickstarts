/* 
* <license header>
*/

import React from 'react'
import { Provider, defaultTheme, Grid, View } from '@adobe/react-spectrum'
import ErrorBoundary from 'react-error-boundary'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import SideBar from './SideBar'
import SideView from './SideView'
import { Home } from './Home'
import MenuView from './MenuView'
import {createBrowserHistory} from 'history'

let history

function App (props) {
  console.log('runtime object:', props.runtime)
  console.log('ims object:', props.ims)

  history = createBrowserHistory()

  // use exc runtime event handlers
  // respond to configuration change events (e.g. user switches org)
  props.runtime.on('configuration', ({ imsOrg, imsToken, locale }) => {
    console.log('configuration change', { imsOrg, imsToken, locale })
  })
  // respond to history change events
  props.runtime.on('history', ({ type, path }) => {
    console.log('history change', { type, path })
    const cleanedPath = path[0] === '/' ? path : '/' + path;
    if (type === 'external' && history.location !== cleanedPath) {
      history.replace(cleanedPath);
    }
  })


  return (
    <ErrorBoundary onError={onError} FallbackComponent={fallbackComponent}>
      <Router>
        <Provider theme={defaultTheme} colorScheme={`light`}>
          <Grid id='baseGrid'
            areas={['sidebar content']}
            columns={['256px', '3fr']}
            rows={['auto']}
            height='100vh'
            gap='size-100'
          >
            <View
              gridArea='sidebar'
              backgroundColor='gray-300'
              padding='size-200'
            >
              <SideBar></SideBar>
            </View>
            <View gridArea='content' padding='size-200'>
              <Switch>
                <Route exact path='/'>
                  <Home runtime={props.runtime}/>
                </Route>
                <Route path='/home'>
                  <Home runtime={props.runtime}/>
                </Route>
                <Route path='/sidebar'>
                  <SideView runtime={props.runtime}/>
                </Route>
                <Route path='/menu'>
                  <MenuView runtime={props.runtime}/>
                </Route>
              </Switch>
            </View>
          </Grid>
        </Provider>
      </Router>
    </ErrorBoundary>
  )

  // Methods

  // error handler on UI rendering failure
  function onError (e, componentStack) { }

  // component to show if UI fails rendering
  function fallbackComponent ({ componentStack, error }) {
    return (
      <>
        <h1 style={{ textAlign: 'center', marginTop: '20px' }}>
          Something went wrong :(
        </h1>
        <pre>{componentStack + '\n' + error.message}</pre>
      </>
    )
  }
}

export default App
