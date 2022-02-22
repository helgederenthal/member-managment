import { Link } from 'react-router-dom'
import { TitleBar } from 'electron-react-titlebar'
import 'electron-react-titlebar/assets/style.css'
import './Titlebar.css'
import logo from './logo.svg'

function Titlebar() {
  return (
    <TitleBar>
      <div id="titlebar">
        <Link className="Link no-drag" to="/">
          <img src={logo} className="Logo" alt="logo" />
        </Link>
        <Link className="Link no-drag" to="/persons">
          Persons
        </Link>
        <Link className="Link no-drag" to="/mandates">
          Mandates
        </Link>
      </div>
    </TitleBar>
  )
}

export default Titlebar
