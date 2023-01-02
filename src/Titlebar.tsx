import { Link, useLocation } from 'react-router-dom'
import { TitleBar as ElectronTitlebar } from 'electron-react-titlebar'
import 'electron-react-titlebar/assets/style.css'
import './Titlebar.css'
import logo from './logo.svg'
import { useEffect, useState } from 'react'

const Titlebar = () => {
  const { pathname } = useLocation()
  const [dashboardClasses, setDashboardClasses] = useState('Link no-drag')
  const [personsClasses, setPersonsClasses] = useState('Link no-drag')
  const [mandatesClasses, setMandatesClasses] = useState('Link no-drag')

  useEffect(() => {
    // Reset states
    setDashboardClasses('Link no-drag logoLink')
    setPersonsClasses('Link no-drag')
    setMandatesClasses('Link no-drag')

    switch (pathname) {
      case '/':
        setDashboardClasses('Link no-drag logoLinkActive')
        break
      case '/persons':
        setPersonsClasses('Link no-drag active')
        break
      case '/mandates':
        setMandatesClasses('Link no-drag active')
        break
    }
  }, [pathname])

  return (
    <ElectronTitlebar>
      <div id="titlebar">
        <Link className={dashboardClasses} to="/">
          <img src={logo} className="Logo" alt="logo" />
        </Link>
        <Link className={personsClasses} to="/persons">
          Persons
        </Link>
        <Link className={mandatesClasses} to="/mandates">
          Mandates
        </Link>
      </div>
    </ElectronTitlebar>
  )
}

export default Titlebar
