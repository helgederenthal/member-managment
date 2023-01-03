import moment from 'moment'
import { useEffect, useState } from 'react'
import { getAnniversariesOfDateInTimespan } from '../../utilities'
import Person from '../../interfaces/Person'

interface MembershipTableProps {
  persons: Person[]
}

const MembershipTable = ({ persons }: MembershipTableProps) => {
  const [membershipHonors, setMembershipHonors] = useState<Person[]>([])

  const timeRangeStart = moment(new Date('2022-04-23T00:00:00Z')).utc()
  const timeRangeEnd = moment(new Date('2023-01-27T23:59:59Z')).utc()

  useEffect(() => {
    const newMembershipHonors: Person[] = []
    const membershipYearsToHonor = [15, 25, 40, 50]
    for (const person of persons) {
      // Get membership anniversaries for current person
      const membershipAnniversaries = getAnniversariesOfDateInTimespan(
        moment(person.joinedAt).utc(),
        timeRangeStart,
        timeRangeEnd
      )
      for (const ma of membershipAnniversaries) {
        if (membershipYearsToHonor.includes(ma)) {
          newMembershipHonors.push({ ...person, years: ma })
        }
      }
    }
    setMembershipHonors(newMembershipHonors)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div id="MembershipTable">
      <div id="TableTitle">Membership Honors</div>
      <div id="TableHeader">
        <div id="TimeRangeArea">
          {timeRangeStart.format('YYYY-MM-DD')} &nbsp;-&gt;&nbsp;{' '}
          {timeRangeEnd.format('YYYY-MM-DD')}
        </div>
        <div id="CountLabel">Count: {membershipHonors.length}</div>
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
            {membershipHonors.map((person) => {
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

export default MembershipTable
