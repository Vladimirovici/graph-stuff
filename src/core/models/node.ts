export type NodeId = string

export enum NodeType {
  BASIC = 'BASIC',
  SERVICE = 'SERVICE',
}

export interface Node {
  label: string
  value: number
  type: NodeType
  adjList: NodeId[]
}
