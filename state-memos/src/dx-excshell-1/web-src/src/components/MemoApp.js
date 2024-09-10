/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import React, { useState, useCallback, useEffect } from 'react'
import {
  AlertDialog,
  Provider,
  defaultTheme,
  Button,
  Dialog,
  DialogTrigger,
  Heading,
  TextArea,
  View,
  Grid,
  Flex,
  Text,
  ActionButton,
  Divider,
  Content,
  ButtonGroup,
  repeat,
  ProgressBar
} from '@adobe/react-spectrum'
import { ToastContainer, ToastQueue } from '@react-spectrum/toast'
import Globe from '@spectrum-icons/workflow/Globe'
import { Plus } from 'lucide-react'
import actionWebInvoke from '../utils'
import config from '../config.json'

// const tileColors = [
//   { bg: 'seafoam-400', border: 'static-seafoam-600' },
//   { bg: 'blue-400', border: 'static-blue-600' },
//   { bg: 'celery-400', border: 'static-celery-600' },
//   { bg: 'magenta-400', border: 'static-magenta-600' },
//   { bg: 'indigo-400', border: 'static-indigo-600' },
//   { bg: 'yellow-400', border: 'static-yellow-600' },
//   { bg: 'purple-400', border: 'static-purple-600' },
// ]

const tileColorsMap = {
  // colorScheme
  light: [
    '#D4D4D4', // Light Grey
    '#DEA584', // Peach
    '#F8C471', // Light Orange
    '#EBDEF0', // Light Purple
    '#A2D9CE', // Light Teal
    '#AED6F1' // Light Blue
  ],
  dark: [
    '#2D3748', // Dark Blue-Grey
    '#B2675E', // Dark Peach
    '#B77C2E', // Dark Orange
    '#7C5295', // Dark Purple
    '#3F6D63', // Dark Teal
    '#3E6B8A' // Dark Blue
  ]
}

const getTileRatio = (index) => {
  const isWide = (index + 1) % 5 === 0
  const isTall = (index + 1) % 2 === 0
  return { cols: isWide ? 2 : 1, rows: isTall ? 2 : 1 }
}

const UpdateMemoDialog = React.memo(function UpdateMemoDialog({
  memo,
  setMemos,
  region,
  close,
  ims
}) {
  const [error, setError] = useState('')
  let dialogText = memo?.content || ''

  const handleSave = useCallback(
    (dialogText) => {
      if (!dialogText.trim()) {
        setError('Cannot be empty.')
        return
      }

      const updatedMemo = {
        id: Date.now(), // memo.id,
        ...memo,
        content: dialogText
      }

      setMemos((prevMemos) => {
        // in background
        actionWebInvoke(
          config['memo-backend/update'],
          {
            authorization: `Bearer ${ims.token}`,
            'x-gw-ims-org-id': ims.org
          },
          {
            id: updatedMemo.id,
            content: updatedMemo.content,
            region
          }
        )
          .then((res) => {
            console.log(`update memo ${updatedMemo.id} response: ${res}`)
          })
          .catch((err) => {
            ToastQueue.negative(`Failed to update memo: ${err.message}`)
          })

        const index = prevMemos.findIndex((memo) => memo.id === updatedMemo.id)
        if (index !== -1) {
          return prevMemos.map((memo) =>
            memo.id === updatedMemo.id ? updatedMemo : memo
          )
        } else {
          // new addition
          return [...prevMemos, updatedMemo]
        }
      })
      setError('')
    },
    [memo]
  )

  const handleDelete = () => {
    // in background
    actionWebInvoke(
      config['memo-backend/delete'],
      { authorization: `Bearer ${ims.token}`, 'x-gw-ims-org-id': ims.org },
      { id: memo.id, region }
    )
      .then((res) => {
        console.log(`delete memo ${memo.id} response: ${JSON.stringify(res)}`)
        if (res.keys === 0) {
          ToastQueue.negative(
            `Failed to delete memo, key not found: ${memo.id}`
          )
        }
      })
      .catch((err) => {
        ToastQueue.negative(`Failed to delete memo: ${err.message}`)
      })
    setMemos((prevMemos) => {
      return prevMemos.filter((m) => m.id !== memo.id)
    })
  }

  return (
    <Dialog>
      <Heading>{memo ? 'Update Memo' : 'Create Memo'}</Heading>
      <Divider />
      <Content width="100%">
        {error && <Text color="negative">{error}</Text>}
        <TextArea
          width="100%"
          height="size-3000"
          label="Memo Content"
          defaultValue={memo ? memo.content : ''}
          onChange={(value) => (dialogText = value)}
        />
      </Content>
      <ButtonGroup>
        <Button variant="secondary" onPress={close}>
          Cancel
        </Button>
        {memo && (
          <Button
            variant="negative"
            onPress={() => {
              handleDelete()
              close()
            }}
          >
            Delete
          </Button>
        )}
        <Button
          variant="accent"
          onPress={() => {
            handleSave(dialogText)
            close()
          }}
        >
          Save
        </Button>
      </ButtonGroup>
    </Dialog>
  )
})

const ClickableTile = React.memo(function MemoTile({
  ratio,
  backgroundColor,
  borderColor,
  children
}) {
  const { cols, rows } = ratio

  return (
    <Button
      elementType="div"
      width="100%"
      height="100%"
      gridColumn={`span ${cols}`}
      gridRow={`span ${rows}`}
      UNSAFE_style={{ padding: '0', borderWidth: '0' }}
    >
      <View
        width="100%"
        height="100%"
        borderRadius="medium"
        UNSAFE_style={{
          backgroundColor,
          borderColor,
          boxShadow:
            '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)'
        }}
        // borderWidth="thick"
      >
        {children}
      </View>
    </Button>
  )
})

const MemoTileContent = React.memo(function MemoTileContent({ ratio, memo }) {
  const { cols, rows } = ratio
  const maxLength = cols > 1 || rows > 1 ? 300 : 100

  const lines = memo.content.split('\n')
  const title = lines[0]
  const content = lines.slice(1).join('\n')

  const contentPreview =
    content.length > maxLength
      ? content.substring(0, maxLength) + '...'
      : content

  const formattedContent = contentPreview.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      {index < contentPreview.split('\n').length - 1 && <br />}
    </React.Fragment>
  ))
  return (
    <View padding="size-100" paddingBottom="size-300" paddingLeft="size-200">
      <Flex>
        <Heading level={2} UNSAFE_style={{ fontSize: '1.3rem' }}>
          {title}
        </Heading>
      </Flex>

      <Text UNSAFE_style={{ fontSize: '1rem' }}>{formattedContent}</Text>
    </View>
  )
})

function MemoApp({ ims, runtime }) {
  const [memos, setMemos] = useState([])
  const [loadingTime, setLoadingTime] = useState(0)
  const [region, setRegion] = useState('amer')
  const [colorScheme, setColorScheme] = useState('light')

  const getTileColor = (index) => {
    return tileColorsMap[colorScheme][index % tileColorsMap[colorScheme].length]
  }

  const setThemeWrapper = (theme) => {
    if (theme.startsWith('spectrum--')) {
      theme = theme.split('spectrum--')[1]
    }
    if (theme !== 'lightest' && theme !== 'darkest') {
      console.warn(`received unknown theme '${theme}', defaulting to lightest`)
      theme = 'lightest'
    }
    setColorScheme(theme === 'darkest' ? 'dark' : 'light')
  }

  // theme on start
  useEffect(() => {
    runtime.user.get('theme').then((theme) => {
      setThemeWrapper(theme)
    })
  })
  // theme on exc-shell user update
  runtime.user.on('change:theme', (theme) => {
    setThemeWrapper(theme)
  })

  const handleWipeOut = () => {
    // in background
    actionWebInvoke(
      config['memo-backend/delete'],
      { authorization: `Bearer ${ims.token}`, 'x-gw-ims-org-id': ims.org },
      { all: true, region }
    )
      .then((res) => {
        console.log(`wipeout memos response: ${JSON.stringify(res)}`)
      })
      .catch((err) => {
        ToastQueue.negative(`Failed to wipe out memos: ${err.message}`)
      })
    setMemos(() => {
      return []
    })
  }

  const handleRefresh = () => {
    const start = Date.now()
    setLoadingTime(0)
    actionWebInvoke(
      config['memo-backend/getAll'],
      { authorization: `Bearer ${ims.token}`, 'x-gw-ims-org-id': ims.org },
      { region }
    )
      .then((memos) => {
        setMemos(memos)
        console.log('memos', memos)
      })
      .catch((err) => {
        ToastQueue.negative(`Failed to load memos: ${err.message}`)
      })
      .finally(() => {
        const time = Date.now() - start
        setLoadingTime(time)
        console.log(`memos for region ${region} loaded in ${time} ms`)
      })
  }

  useEffect(() => {
    handleRefresh()
  }, [region])

  const togleRegion = () => {
    setRegion((prevRegion) => {
      if (prevRegion === 'amer') {
        return 'emea'
      }
      if (prevRegion === 'emea') {
        return 'amer' // 'apac'
      }
      return 'amer' // default
    })
  }

  const sortedMemos = [...memos].sort((a, b) => a.id - b.id)

  return (
    <Provider
      theme={defaultTheme}
      colorScheme={colorScheme}
      height="100vh"
      UNSAFE_style={{ overflow: 'auto' }}
    >
      <ToastContainer />
      <View padding="size-200">
        <Flex
          justifyContent="space-between"
          alignItems="center"
          marginBottom="size-200"
        >
          <ActionButton isQuiet onPress={handleRefresh}>
            <Heading level={1}>State Memos</Heading>
          </ActionButton>
          <ActionButton
            onPress={togleRegion}
            quiet
            height="size-600"
            width="size-1200"
            UNSAFE_style={{ marginLeft: '-95px' }}
          >
            {region === 'amer' && <Text>US</Text>}
            {region === 'emea' && <Text>EU</Text>}
            <Globe width="size-400" height="size-400" />
          </ActionButton>
          <Flex gap="size-200" alignItems="center">
            <DialogTrigger>
              <Button
                variant="negative"
                style="fill"
                quiet
                height="size-600"
                width="size-1000"
              >
                Wipe!
              </Button>
              <AlertDialog
                title="Delete all memos?"
                variant="destructive"
                primaryActionLabel="Delete All"
                cancelLabel="Cancel"
                onPrimaryAction={handleWipeOut}
              >
                You are about to delete all memos in the current region, do you
                confirm?
              </AlertDialog>
            </DialogTrigger>
          </Flex>
        </Flex>

        {loadingTime === 0 && <ProgressBar label="Loading…" isIndeterminate />}
        {loadingTime !== 0 && (
          <Grid
            columns={{
              // todo make getTileRatio responsive
              S: [repeat(2, '1fr')],
              M: [repeat(4, '1fr')],
              L: [repeat(6, '1fr')]
            }}
            gap="size-200"
            marginBottom="size-200"
          >
            {sortedMemos.map((memo, index) => (
              <DialogTrigger key={memo.id}>
                <ClickableTile
                  ratio={getTileRatio(index)}
                  backgroundColor={getTileColor(index)}
                >
                  <MemoTileContent memo={memo} ratio={getTileRatio(index)} />
                </ClickableTile>
                {(close) => (
                  <UpdateMemoDialog
                    close={close}
                    memo={memo}
                    setMemos={setMemos}
                    region={region}
                    ims={ims}
                  />
                )}
              </DialogTrigger>
            ))}
            <DialogTrigger>
              <ClickableTile
                ratio={getTileRatio(sortedMemos.length)}
                backgroundColor={colorScheme === 'dark' ? '#2D3748' : '#f5f5f5'}
              >
                <Flex justifyContent="center" alignItems="center" height="100%">
                  <Plus
                    size={100}
                    color={colorScheme === 'dark' ? '#ffffff' : '#1e1e1e'}
                  />
                </Flex>
              </ClickableTile>
              {(close) => (
                <UpdateMemoDialog
                  close={close}
                  setMemos={setMemos}
                  region={region}
                  ims={ims}
                />
              )}
            </DialogTrigger>
          </Grid>
        )}
      </View>
    </Provider>
  )
}

export default MemoApp
