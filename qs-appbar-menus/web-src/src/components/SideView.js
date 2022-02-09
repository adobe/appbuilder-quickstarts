/*
 * Copyright 2022 Adobe Inc. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
*/

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