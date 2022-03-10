import React from 'react'
import { Node, NodeType } from 'core/models/node'
import { Flex, Text, Center } from '@chakra-ui/react'

export function NodeBar(props: { node: Node }) {
  const { node } = props
  if (!node) return <></>

  // Should be extracted to a separate mappings file
  const NodeTypeColors = {
    [NodeType.BASIC]: '#d7ebff',
    [NodeType.SERVICE]: '#d4eeea',
  }

  return (
    <Flex direction="column" height="100%">
      <Center height="90%">
        <Center
          bg={NodeTypeColors[node.type]}
          height={node.value + '%'}
          borderRadius="10px"
          width="80px"
        >
          <Text transform="rotate(-90deg)" whiteSpace="nowrap">
            {node.label}
          </Text>
        </Center>
      </Center>

      <Center height="10%">
        <Text>{node.value}%</Text>
      </Center>
    </Flex>
  )
}
