import moment from 'moment'
import { useEffect, useState } from 'react'
import Person from '../../interfaces/Person'
import { getAnniversariesOfDateInTimespan } from '../../utilities'

interface BirthdayTableProps {
  persons: Person[]
}

const BirthdayTable = ({ persons }: BirthdayTableProps) => {
  const [birthdayHonors, setBirthdayHonors] = useState<Person[]>([])

  const timeRangeStart = moment(new Date('2023-01-01T00:00:00Z')).utc()
  const timeRangeEnd = moment(new Date('2023-12-31T23:59:59Z')).utc()

  useEffect(() => {
    const newBirthdayHonors: Person[] = []
    const birthdayYearsToHonor = [
      50, 60, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120,
    ]
    for (const person of persons) {
      // Get membership anniversaries for current person
      const birthdayAnniversaries = getAnniversariesOfDateInTimespan(
        moment(person.dateOfBirth).utc(),
        timeRangeStart,
        timeRangeEnd
      )
      for (const ma of birthdayAnniversaries) {
        if (birthdayYearsToHonor.includes(ma)) {
          newBirthdayHonors.push({ ...person, years: ma })
        }
      }
    }
    setBirthdayHonors(newBirthdayHonors)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div id="BirthdayTable">
      <div id="TableTitle">Birthday Honors</div>
      <div id="TableHeader">
        <div id="TimeRangeArea">
          {timeRangeStart.format('YYYY-MM-DD')} &nbsp;-&gt;&nbsp;{' '}
          {timeRangeEnd.format('YYYY-MM-DD')}
        </div>
        <div id="CountLabel">Count: {birthdayHonors.length}</div>
      </div>
      <table className="table">
        <thead className="header">
          <tr>
            <th className="years">Years</th>
            <th className="lastname">Lastname</th>
            <th className="firstname">Firstname</th>
            <th className="street">Street</th>
            <th className="postcode">Postcode</th>
            <th className="city">City</th>
            <th className="dateOfBirth">Date of birth</th>
            <th className="joinedAt">Member since</th>
          </tr>
        </thead>
        <tbody className="body">
          <>
            {birthdayHonors.map((person) => {
              let dateOfBirth = person.dateOfBirth
                ? moment(new Date(person.dateOfBirth)).format('YYYY-MM-DD')
                : ''
              let joinedAt = person.joinedAt
                ? moment(new Date(person.joinedAt)).format('YYYY-MM-DD')
                : ''
              return (
                <tr key={person.id}>
                  <td className="years">{person.years}</td>
                  <td className="lastname">{person.lastname}</td>
                  <td className="firstname">{person.firstname}</td>
                  <td className="street">{person.street}</td>
                  <td className="postcode">{person.postcode}</td>
                  <td className="city">{person.city}</td>
                  <td className="dateOfBirth">{dateOfBirth}</td>
                  <td className="joinedAt">{joinedAt}</td>
                </tr>
              )
            })}
          </>
        </tbody>
      </table>
    </div>
  )
}

export default BirthdayTable
