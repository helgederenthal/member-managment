import { useState, useMemo } from 'react'
import { ipcRenderer } from 'electron'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Titlebar from './Titlebar'
import Persons from './Persons'
import Mandates from './Mandates'
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client'
import Dashboard from './Dashboard'

function App() {
  const [apiPort, setApiPort] = useState(0)
  const [apolloClient, setApolloClient] = useState(
    new ApolloClient({
      cache: new InMemoryCache(),
    })
  )

  useMemo(() => {
    if (apiPort === 0) {
      if (ipcRenderer) {
        ipcRenderer.on('apiDetails', (_event, arg: Number) => {
          setApolloClient(
            new ApolloClient({
              cache: new InMemoryCache(),
              link: new HttpLink({
                uri: `http://localhost:${Number.parseInt(arg.toString())}`,
              }),
              credentials: 'same-origin',
            })
          )

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
      <ApolloProvider client={apolloClient}>
        <Titlebar />
        <div className="App-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
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
      </ApolloProvider>
    </div>
  )
}

export default App
