import { useState, useMemo } from 'react'
import { ipcRenderer } from 'electron'
import logo from './logo.svg'
import './App.css'

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
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          target="_blank"
          rel="noreferrer"
          href={graphQlApiUrl}
        >
          GraphQL-Port: {apiPort}
        </a>
      </header>
    </div>
  )
}

export default App
