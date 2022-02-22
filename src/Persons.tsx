import { gql, useQuery } from '@apollo/client'
import moment from 'moment'
import './Persons.css'

const persons = gql`
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

interface Person {
  id: string
  firstname: string
  lastname: string
  street: string
  postcode: number
  city: string
  dateOfBirth: string
  joinedAt: string
}

function Persons() {
  const { loading, error, data } = useQuery(persons)

  if (loading) return <div>Loading persons...</div>

  if (error)
    return (
      <div>
        Error loading persons
        <br />
        {error.message}
      </div>
    )

  return (
    <div id="Persons">
      <table className="table">
        <thead className="header">
          <tr>
            <th className="firstname">Firstname</th>
            <th className="lastname">Lastname</th>
            <th className="street">Street</th>
            <th className="postcode">Postcode</th>
            <th className="city">City</th>
            <th className="dateOfBirth">Date of birth</th>
            <th className="joinedAt">Member since</th>
          </tr>
        </thead>
        <tbody className="body">
          {data.allPersons.map((person: Person) => {
            let dateOfBirth = person.dateOfBirth
              ? moment(new Date(person.dateOfBirth)).format('YYYY-MM-DD')
              : ''
            let joinedAt = person.joinedAt
              ? moment(new Date(person.joinedAt)).format('YYYY-MM-DD')
              : ''
            return (
              <tr key={person.id}>
                <td className="firstname">{person.firstname}</td>
                <td className="lastname">{person.lastname}</td>
                <td className="street">{person.street}</td>
                <td className="postcode">{person.postcode}</td>
                <td className="city">{person.city}</td>
                <td className="dateOfBirth">{dateOfBirth}</td>
                <td className="joinedAt">{joinedAt}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Persons
