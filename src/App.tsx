import { useState, useMemo, Suspense } from 'react'
import { ipcRenderer } from 'electron'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Titlebar from './Titlebar'
import Dashboard from './pages/Dashboard/Dashboard'
import PersonList from './pages/PersonList/PersonList'
import MandateList from './pages/MandateList/MandateList'
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client'
import logo from './logo.svg'
import Footer from './Footer'

function App() {
  const [apiPort, setApiPort] = useState(0)
  const [apolloClient, setApolloClient] = useState(
    new ApolloClient({
      cache: new InMemoryCache(),
    })
  )
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [language, setLanguage] = useState('en')

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

  return (
    <Suspense fallback="loading...">
      <ApolloProvider client={apolloClient}>
        <HashRouter>
          <div className="App">
            <Titlebar />
            <div className="App-content">
              <img
                className="App-background-image"
                src={logo}
                alt="Logo for background"
              />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/persons" element={<PersonList />} />
                <Route path="/mandates" element={<MandateList />} />
              </Routes>
            </div>
            <Footer apiPort={apiPort} setLanguage={setLanguage} />
          </div>
        </HashRouter>
      </ApolloProvider>
    </Suspense>
  )
}

export default App
