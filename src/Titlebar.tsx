import { Link, useLocation } from 'react-router-dom'
import { TitleBar } from 'electron-react-titlebar'
import 'electron-react-titlebar/assets/style.css'
import './Titlebar.css'
import logo from './logo.svg'
import { useEffect, useState } from 'react'

function Titlebar() {
  const { pathname } = useLocation()
  const [personsClasses, setPersonsClasses] = useState('Link no-drag')
  const [mandatesClasses, setMandatesClasses] = useState('Link no-drag')

  useEffect(() => {
    // Reset states
    setPersonsClasses('Link no-drag')
    setMandatesClasses('Link no-drag')

    switch (pathname) {
      case '/persons':
        setPersonsClasses('Link no-drag active')
        break
      case '/mandates':
        setMandatesClasses('Link no-drag active')
        break
    }
    console.log('pathname: ' + pathname)
  }, [pathname])

  return (
    <TitleBar>
      <div id="titlebar">
        <Link className="Link no-drag" to="/">
          <img src={logo} className="Logo" alt="logo" />
        </Link>
        <Link className={personsClasses} to="/persons">
          Persons
        </Link>
        <Link className={mandatesClasses} to="/mandates">
          Mandates
        </Link>
      </div>
    </TitleBar>
  )
}

export default Titlebar
