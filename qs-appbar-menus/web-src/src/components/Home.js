/*
* <license header>
*/

import React, { useEffect, useState } from 'react'
import { Heading, View, Button, Text, Dialog, ButtonGroup, ProgressCircle } from '@adobe/react-spectrum'

import page from '@adobe/exc-app/page'
import sidebar from '@adobe/exc-app/sidebar'
import topbar from '@adobe/exc-app/topbar'
import userProfile from '@adobe/exc-app/userprofile'

import ShowMenu from '@spectrum-icons/workflow/ShowMenu'

const showSpinner = () => {
  // sidebar.collapsed = false
  page.spinner = true
  setTimeout(() => {
    page.spinner = false
    // sidebar.collapsed = true
  }, 2000)
}




const setCustomSearch = () => {
  const [state, setState] = useState(true)
  topbar.setCustomSearch({callback: value => {
    console.log('heres yo value : ', value)
  }, enabled: true, open: true});
}

function setModal() {
  window.runtime.modal = !window.runtime.modal
}

// runtime.heroClick = () => window.alert('Playground customHeroClick callback invoked!');

export const Home = (props) => {
  const [state, setState] = useState({
    coachMark: {},
    configuration: null,
    dialog: null,
    modal: false,
    search: false,
    runtime: props.runtime
  })

  
  // props.runtime.customEnvLabel = 'Welcome to multiappjm'

  props.runtime.customButtons = [
    {
      id: 'helpcenterresource',
      label: 'Alpha Button - do not press',
      scope: 'helpCenterResource'
    }, {
      id: 'create_analytics_support_ticket',
      label: 'Definitely Custom',
      scope: 'helpCenter'
    }
  ]

  props.runtime.customButtonClick = (btn) => {
    window.alert('Custom button was clicked!\n', btn)
  }
  props.runtime.on('customButtonClick', ({type, value}) => {
    console.log('Configured custom button "test1" in user profile section was clicked! ', type, value)
  })

  props.runtime.on('customSearch', value => {
    console.log('customSearch: ', value)
  })

  userProfile.setButtons([
    {callback: () => window.alert('clicked button 1!'), id: 'id1', label: 'Button 1'},
    {callback: () => window.alert('clicked button 2!'), id: 'id2', label: 'Button 2'}
  ]);

  const [isNavBlocked, setNavBlocked] = useState(false)

  useEffect(
    () => {
      console.log("effect");
    },
    [props.runtime]
  );

  const blockNav = () => {
    console.log('isNavBlocked = ', isNavBlocked)
    if(!isNavBlocked) {
      state.runtime.blockNavigation(true)
      setNavBlocked(true)
      setTimeout(() => {
        state.runtime.blockNavigation(false)
        setNavBlocked(false)
      }, 5000)
    }
  }

  props.runtime.feedback = {
    buttonLabel: 'Beta Feedback',
    enabled: true,
    type: 'external',
    url: 'https://www.adobe.com'
  }

  useEffect(() => {
    return () => {
      console.log("cleaned up");
      props.runtime.feedback = {enabled: false}
    };
  }, []);

  props.runtime.app().then((appId) => {
    console.log('appId = ', appId)
    return appId.get('firefly')
  }).then((info) => {
    console.log('appInfo = ', info)
  })
  


  return (
    <View width='size-6000'>
      <Heading level={1}>Welcome to multiappjm!</Heading>
      <ButtonGroup>
        <Button variant='primary' onPress={showSpinner}>Show spinner for 2 seconds</Button>
        <Button variant='primary' onPress={setCustomSearch}>Set Custom Search</Button>
        <Button variant='primary' onPress={setModal}>Set App Modal</Button>
        <Button variant='primary' onPress={blockNav}>
        { isNavBlocked ? ( <ProgressCircle aria-label="Loading…" isIndeterminate /> ) : 'Block Navigation for 5 seconds' }
        </Button>
      </ButtonGroup>
    </View>
  )
}
