import { Node, NodeId } from './node'

export type Graph = { [nodeId: string]: Node }
export type Path = NodeId[]
