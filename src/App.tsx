import React from 'react'
import DropoutChart from './components/dropout-chart/DropoutChart'
import './app.css'
import { Center } from '@chakra-ui/react'

const App = () => {
  return (
    <Center bg="#ecf2ff" height="100%" px="40">
      <DropoutChart />
    </Center>
  )
}

export default App
