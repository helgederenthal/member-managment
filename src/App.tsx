import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
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

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Link className="App-link" to="/">
          GraphQL-Port: {apiPort}
        </Link>
      </header>
    </div>
  )
}

export default App
