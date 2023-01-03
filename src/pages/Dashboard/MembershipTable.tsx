import moment from 'moment'
import { useEffect, useState } from 'react'
import { TableSortLabel } from '@mui/material'
import {
  getAnniversariesOfDateInTimespan,
  Sorting,
  sortPersons,
} from '../../utilities'
import Person from '../../interfaces/Person'

interface MembershipTableProps {
  persons: Person[]
}

const MembershipTable = ({ persons }: MembershipTableProps) => {
  const [membershipHonors, setMembershipHonors] = useState<Person[]>([])

  const [sorting, setSorting] = useState<Sorting>({
    column: 'years',
    direction: 'asc',
  })

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
    const orderedPersonList = sortPersons(newMembershipHonors as Person[], {
      column: 'years',
      direction: 'asc',
    })
    setMembershipHonors(orderedPersonList)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Reorder when sorting changes
  useEffect(() => {
    if (membershipHonors && membershipHonors.length > 0) {
      setMembershipHonors(sortPersons(membershipHonors, sorting))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorting])

  // Event handler for table sorting
  const changeSorting = (newColumn: string) => {
    // Init new direction with 'asc'
    let newDirection: 'asc' | 'desc' = 'asc'
    // If table was already sorted by this column
    if (sorting.column === newColumn) {
      // Switch direction
      if (sorting.direction === 'asc') {
        newDirection = 'desc'
      }
    }
    // Set new sorting
    setSorting({ column: newColumn, direction: newDirection })
  }

  return (
    <div id="MembershipTable">
      <div id="TableTitle">Membership Honors</div>
      <div id="TableHeader">
        <div id="TimeRangeArea">
          {timeRangeStart.format('YYYY-MM-DD')} &nbsp;&gt;&nbsp;{' '}
          {timeRangeEnd.format('YYYY-MM-DD')}
        </div>
        <div id="CountLabel">Count: {membershipHonors.length}</div>
      </div>
      <table className="table">
        <thead className="header">
          <tr>
            <th className="years">
              <TableSortLabel
                active={sorting.column === 'years'}
                direction={sorting.direction}
                onClick={() => changeSorting('years')}
              >
                Years
              </TableSortLabel>
            </th>
            <th className="lastname">
              <TableSortLabel
                active={sorting.column === 'lastname'}
                direction={sorting.direction}
                onClick={() => changeSorting('lastname')}
              >
                Lastname
              </TableSortLabel>
            </th>
            <th className="firstname">
              <TableSortLabel
                active={sorting.column === 'firstname'}
                direction={sorting.direction}
                onClick={() => changeSorting('firstname')}
              >
                Firstname
              </TableSortLabel>
            </th>
            <th className="street">
              <TableSortLabel
                active={sorting.column === 'street'}
                direction={sorting.direction}
                onClick={() => changeSorting('street')}
              >
                Street
              </TableSortLabel>
            </th>
            <th className="postcode">
              <TableSortLabel
                active={sorting.column === 'postcode'}
                direction={sorting.direction}
                onClick={() => changeSorting('postcode')}
              >
                Postcode
              </TableSortLabel>
            </th>
            <th className="city">
              <TableSortLabel
                active={sorting.column === 'city'}
                direction={sorting.direction}
                onClick={() => changeSorting('city')}
              >
                City
              </TableSortLabel>
            </th>
            <th className="dateOfBirth">
              <TableSortLabel
                active={sorting.column === 'dateOfBirth'}
                direction={sorting.direction}
                onClick={() => changeSorting('dateOfBirth')}
              >
                Date of birth
              </TableSortLabel>
            </th>
            <th className="joinedAt">
              <TableSortLabel
                active={sorting.column === 'joinedAt'}
                direction={sorting.direction}
                onClick={() => changeSorting('joinedAt')}
              >
                Member since
              </TableSortLabel>
            </th>
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
