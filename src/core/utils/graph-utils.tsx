import { NodeId } from 'core/models/node'
import { Graph, Path } from 'core/models/graph'

export const pathToLabel = (p: Path = []) => p.join(' -> ')

export const labelToPath = (pl = ''): Path => (pl ? pl.split(' -> ') : [])

export const hydratePath = (g: Graph, p: Path = []) =>
  p.length ? p.map(node => g[node]) : []

export const getPaths = (graph: Graph) => {
  const src = Object.keys(graph)[0]
  if (!graph || !src) return []

  const paths: Path[] = []

  const traversePaths = (
    g: Graph,
    src: NodeId,
    currentPath: Path,
    visited = new Set<string>()
  ) => {
    // cycle prevention
    if (visited.has(src)) return
    visited.add(src)

    const current = g[src]
    // leaf case
    if (current.adjList.length === 0) {
      paths.push([...currentPath, src])
      return
    }

    // branching case
    currentPath.push(src)
    current.adjList.forEach(branch =>
      traversePaths(g, branch, [...currentPath], visited)
    )
  }
  traversePaths(graph, src, [])
  return paths
}
