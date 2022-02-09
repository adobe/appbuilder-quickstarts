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
import { Heading, View, Button, Text, Dialog, ButtonGroup, ProgressCircle } from '@adobe/react-spectrum'
import topbar from '@adobe/exc-app/topbar'

const addMenu = () => {
  let workspaceConfig = [
    {
      name: 'Home',
      url: '/#/home'
    }, {
      name: 'Edit',
      url: '/childframe',
      preventNavigationIfActive: true,
      menu: [{ 
        name: 'Library1'
      }, {
        name: 'Library2',
        url: '/library/library2',
        menu: [{
          name: 'Library3',
          url: '/library/library2/library3' 
      }, {
        name: 'Library4',
        url: '/library/library2/library4',
        menu: [{ 
          name: 'Library5',
          url: '/library/library2/library4/library5'
        }]
      }]
    }]
    }, {
      name: 'External ...',
      url: 'https://www.adobe.com',
      newtab: true
    }
  ]
  topbar.workspaces = workspaceConfig;
}

export default function (props) {

  props.runtime.on('customButtonClick', ({type, value}) => {
    console.log('customButtonClick:', type, value)
  })

  props.runtime.shell.on('change:subOrg', (item) => {
    console.log('change:subOrg', item)
  });

  useEffect(() => {
    return () => {
      console.log('removing menu')
      topbar.workspaces = []
    }
  })

  return (
    <View width='size-6000'>
      <Heading level={1}>Welcome to multiappjm!</Heading>
      <ButtonGroup>
        <Button variant='primary' onPress={addMenu}>Add a custom menu</Button>
      </ButtonGroup>
    </View>)

}