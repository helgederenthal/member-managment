import {useState, useMemo} from 'react'
import logo from './logo.svg';
import './App.css';
import { ipcRenderer } from 'electron'

function App() {
  const [apiPort, setApiPort] = useState(0);

  useMemo(() => {
    if (apiPort === 0) {
        if (ipcRenderer) {
            ipcRenderer.on("apiDetails", ({}, arg:Number) => {
                setApiPort(Number.parseInt(arg.toString())); // setting apiPort causes useMemo'd appGlobalClient to be re-evaluated
            });
            ipcRenderer.send("getApiDetails");
        }
        return null;
    }
  }, [apiPort]);
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href={`http://localhost:${apiPort}/graphiql`}
        >
          GraphQL-Port: {apiPort}
        </a>
      </header>
    </div>
  );
}

export default App;
