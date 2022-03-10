import { Select } from '@chakra-ui/react'
import { Path } from 'core/models/graph'
import { pathToLabel, labelToPath } from '../../core/utils/graph-utils'

export function PathSelector(props: {
  paths: Path[]
  selectedPath: Path
  onPathSelected: (path: Path) => void
}) {
  const paths = props.paths.map(pathToLabel)
  const selectedPath = pathToLabel(props.selectedPath)

  function onSelection(pathLabel: string) {
    if (!pathLabel) return
    props.onPathSelected(labelToPath(pathLabel))
  }

  return (
    <Select
      placeholder="Choose branches"
      w="200px"
      size="xs"
      value={selectedPath}
      onChange={x => onSelection(x.target.value)}
      bg="#ececec"
      borderRadius="6px"
    >
      {paths.map(path => (
        <option key={path} value={path}>
          {path}
        </option>
      ))}
    </Select>
  )
}
