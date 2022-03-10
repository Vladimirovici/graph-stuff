import React from 'react'
import { Node } from 'core/models/node'
import { Text, Image, VStack, Center } from '@chakra-ui/react'
import downArrow from 'assets/images/down-arrow.svg'
import rightArrow from 'assets/images/right-arrow.svg'

export function DiffIndicator(props: { node: Node; prevNode: Node }) {
  if (!props.node || !props.prevNode) return <></>

  const diff = props.prevNode.value - props.node.value
  const image = diff > 0 ? downArrow : rightArrow

  return (
    <VStack position="relative" top="-10px">
      <Center bg="#e3e3e3" boxSize="50px" borderRadius="50%">
        <Image src={image} alt="arrow" />
      </Center>
      <Text color="#9b9b9b">-{diff}%</Text>
    </VStack>
  )
}
