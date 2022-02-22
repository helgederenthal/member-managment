import { useState, useMemo } from 'react'
import { ipcRenderer } from 'electron'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Titlebar from './Titlebar'
import Persons from './Persons'
import Mandates from './Mandates'

function App() {
  const [apiPort, setApiPort] = useState(0)

  useMemo(() => {
    if (apiPort === 0) {
      if (ipcRenderer) {
        ipcRenderer.on('apiDetails', (_event, arg: Number) => {
          setApiPort(Number.parseInt(arg.toString())) // setting apiPort causes useMemo'd appGlobalClient to be re-evaluated
        })
        ipcRenderer.send('getApiDetails')
      }
      return null
    }
  }, [apiPort])

  const graphQlApiUrl = `http://localhost:${apiPort}`

  return (
    <div className="App">
      <Titlebar />
      <div className="App-content">
        <Routes>
          <Route path="/persons" element={<Persons />} />
          <Route path="/mandates" element={<Mandates />} />
        </Routes>
      </div>

      <footer className="App-footer">
        <a
          className="App-link"
          target="_blank"
          rel="noreferrer"
          href={graphQlApiUrl}
        >
          GraphQL-Port: {apiPort}
        </a>
      </footer>
    </div>
  )
}

export default App
