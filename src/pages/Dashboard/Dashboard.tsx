import { gql, useQuery } from '@apollo/client'
import Person from '../../interfaces/Person'
import MembershipTable from './MembershipTable'
import './Dashboard.css'
import BirthdayTable from './BirthdayTable'

const personsQuery = gql`
  query {
    allPersons {
      id
      firstname
      lastname
      street
      postcode
      city
      dateOfBirth
      joinedAt
    }
  }
`

const Dashboard = () => {
  const { loading, error, data } = useQuery(personsQuery)

  if (loading) return <div>Loading persons...</div>

  if (error)
    return (
      <div>
        Error loading persons
        <br />
        {error.message}
      </div>
    )

  const persons: Person[] = data.allPersons

  return (
    <div id="Dashboard">
      <MembershipTable persons={persons} />

      <BirthdayTable persons={persons} />
    </div>
  )
}

export { Dashboard as default }
