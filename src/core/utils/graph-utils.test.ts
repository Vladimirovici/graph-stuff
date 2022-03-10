import { Path } from 'core/models/graph'
import { NodeType } from 'core/models/node'
import {
  getPaths,
  hydratePath,
  labelToPath,
  pathToLabel,
} from 'core/utils/graph-utils'

const graph = {
  node1: {
    label: 'Contact Info',
    value: 100,
    type: NodeType.BASIC,
    adjList: ['node2'],
  },
  node2: {
    label: 'NemID',
    value: 95,
    type: NodeType.SERVICE,
    adjList: ['node3', 'nodeBranch2'],
  },
  node3: {
    label: 'Personal Address',
    value: 95,
    type: NodeType.BASIC,
    adjList: [],
  },
  nodeBranch2: {
    label: 'Branch 2',
    value: 55,
    type: NodeType.BASIC,
    adjList: ['nodeBranch3'],
  },
  nodeBranch3: {
    label: 'Branch 3',
    value: 25,
    type: NodeType.BASIC,
    adjList: [],
  },
}

test('it should return all paths of tree', () => {
  const expected = [
    ['node1', 'node2', 'node3'],
    ['node1', 'node2', 'nodeBranch2', 'nodeBranch3'],
  ]
  const paths = getPaths(graph)
  expect(paths).toEqual(expected)
})

test('it should not crash when graph has cycle', () => {
  const cycleGraph = {
    ...graph,
    node2: {
      label: 'NemID',
      value: 95,
      type: NodeType.SERVICE,
      adjList: ['node3', 'nodeBranch2', 'node1'],
    },
  }
  const expected = [
    ['node1', 'node2', 'node3'],
    ['node1', 'node2', 'nodeBranch2', 'nodeBranch3'],
  ]
  expect(getPaths(cycleGraph)).toEqual(expected)
})

test('it should return no paths for empty graph', () => {
  const graph = {}
  const expected: any[] = []

  const paths = getPaths(graph)
  expect(paths).toEqual(expected)
})

test('path hydration', () => {
  const path: Path = ['node1', 'node2', 'node3']
  const hydratedPath = hydratePath(graph, path)
  const expected = [
    {
      label: 'Contact Info',
      value: 100,
      type: NodeType.BASIC,
      adjList: ['node2'],
    },
    {
      label: 'NemID',
      value: 95,
      type: NodeType.SERVICE,
      adjList: ['node3', 'nodeBranch2'],
    },
    {
      label: 'Personal Address',
      value: 95,
      type: NodeType.BASIC,
      adjList: [],
    },
  ]

  expect(hydratedPath).toEqual(expected)
})

test('path to label', () => {
  let path: Path | null = ['node1', 'node2', 'node3']
  let expected = 'node1 -> node2 -> node3'

  expect(pathToLabel(path)).toEqual(expected)

  path = []
  expected = ''
  expect(pathToLabel(path)).toEqual(expected)
})

test('label to path', () => {
  let label = 'node1 -> node2 -> node3'
  let expected: Path = ['node1', 'node2', 'node3']

  expect(labelToPath(label)).toEqual(expected)

  label = ''
  expected = []

  expect(labelToPath(label)).toEqual(expected)
})
