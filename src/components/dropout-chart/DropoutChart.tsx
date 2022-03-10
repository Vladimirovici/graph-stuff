import { ChartHeader } from './ChartHeader'
import { PathSelector } from './PathSelector'
import React, { useEffect, useState } from 'react'
import { Node } from 'core/models/node'
import { Graph, Path } from 'core/models/graph'
import { VStack, HStack, useToast } from '@chakra-ui/react'
import { getPaths, hydratePath } from '../../core/utils/graph-utils'
import { DiffIndicator } from './DiffIndicator'
import { NodeBar } from './NodeBar'
import Loading from 'components/shared/Loading'

export default function DropoutChart() {
  const [graph, setGraph] = useState<Graph>()
  const [paths, setPaths] = useState<Path[]>([])
  const [selectedPath, setSelectedPath] = useState<Path>([])
  const toast = useToast()

  useEffect(() => {
    fetch('https://hf-demo-api.herokuapp.com/')
      .then(resp => resp.json())
      .then(setGraph)
      .catch(err => {
        toast({
          status: 'error',
          description: err.message,
          position: 'bottom-right',
        })
      })
  }, [])

  useEffect(() => {
    if (!graph) return

    const paths = getPaths(graph)
    if (!paths?.length) return

    setPaths(paths)
    setSelectedPath(paths[0])
  }, [graph])

  return (
    <VStack
      w="100%"
      maxW="990px"
      alignItems="stretch"
      bg="white"
      borderRadius="10px"
    >
      <ChartHeader
        dropdown={
          <PathSelector
            paths={paths}
            selectedPath={selectedPath}
            onPathSelected={setSelectedPath}
          />
        }
      />

      {!graph || !selectedPath ? (
        <Loading height="520px" />
      ) : (
        <HStack h="520px" gap="15" p="10" overflowX="auto">
          {/* no need to memo, the only thing to cause re-render is a change in selectedPath */}
          {hydratePath(graph, selectedPath).map((node, i, path) => {
            const prevNode: Node | null = i > 0 ? path[i - 1] : null

            return (
              <React.Fragment key={node.label}>
                {prevNode && <DiffIndicator node={node} prevNode={prevNode} />}
                <NodeBar node={node} />
              </React.Fragment>
            )
          })}
        </HStack>
      )}
    </VStack>
  )
}
