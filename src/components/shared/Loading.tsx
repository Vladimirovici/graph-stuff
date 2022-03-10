import { Center, Spinner } from '@chakra-ui/react'
import React from 'react'

export default function Loading(props: { height?: string; width?: string }) {
  return (
    <Center w={props.width || '100%'} h={props.height || '100%'}>
      <Spinner size="xl" />
    </Center>
  )
}
