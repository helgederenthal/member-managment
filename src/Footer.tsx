import { useTranslation } from 'react-i18next'

interface FooterProps {
  apiPort: Number
  setLanguage: (language: string) => void
}

const Footer = ({ apiPort, setLanguage }: FooterProps) => {
  const { i18n } = useTranslation()
  const graphQlApiUrl = `http://localhost:${apiPort}`

  const changeLanguage = () => {
    const ls = document.getElementById('languageSelector') as HTMLSelectElement
    i18n.changeLanguage(ls?.value)
    setLanguage(ls?.value)
  }

  return (
    <footer className="App-footer">
      <div className="GraphQL-Label">
        <a
          className="App-link"
          target="_blank"
          rel="noreferrer"
          href={graphQlApiUrl}
        >
          GraphQL-Port: {apiPort}
        </a>
      </div>
      <select
        className="languageSelector"
        name="languageSelector"
        id="languageSelector"
        onChange={changeLanguage}
      >
        <option value="en">en</option>
        <option value="de">de</option>
      </select>
    </footer>
  )
}

export default Footer
