
import React, { useEffect, useState } from 'react'
import sidebar from '@adobe/exc-app/sidebar'
import { Heading, View, Button, Text, Dialog, ButtonGroup, ProgressCircle } from '@adobe/react-spectrum'

export default function SideView(props) {

  // useEffect(() => {
    sidebar.config = {
      menu: [
        {
          absolutePath: true,
          id: 'home',
          name: 'Home',
          url: '/home'
        }
      ],
      settings: {
        typeToSelect: true,
        variant: 'multiLevel'
      }
    }
    sidebar.collapsed = false
  // })

  console.log('sidebar = ', sidebar)
  window.sidebar = sidebar

  const showSideBar = () => {
    sidebar.visible = true
  }

  const hideSideBar = () => {
    sidebar.visible = false
  }


  return (
    <View width='size-6000'>
      <Heading level={1}>Show Hide Sidebar!</Heading>
      <ButtonGroup>
        <Button variant='primary' onPress={showSideBar}>Show SideBar</Button>
        <Button variant='primary' onPress={hideSideBar}>Hide SideBar</Button>
      </ButtonGroup>
    </View>
  )

}