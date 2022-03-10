import React from 'react'
import { Flex, Spacer, IconButton, Text, Image } from '@chakra-ui/react'
import settingsImg from 'assets/images/settings.svg'

export function ChartHeader(props: { dropdown: React.ReactNode }) {
  return (
    <Flex p="4" gap="3" borderBottom="1px solid #ecf2ff" alignItems="center">
      <Text fontSize={18}>Flow dropout per step and service</Text>
      <Spacer />
      {props.dropdown}
      <IconButton
        aria-label="settings"
        bg="#ececec"
        icon={<Image src={settingsImg} boxSize="4" />}
        size="xs"
      />
    </Flex>
  )
}
