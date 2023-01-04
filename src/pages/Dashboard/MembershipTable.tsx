import moment from 'moment'
import { useEffect, useState } from 'react'
import { TableSortLabel } from '@mui/material'
import HeightIcon from '@mui/icons-material/Height'
import {
  getAnniversariesOfDateInTimespan,
  Sorting,
  sortPersons,
} from '../../utilities'
import Person from '../../interfaces/Person'
import { Trans } from 'react-i18next'

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
      <div id="TableTitle">
        <Trans>Membership Honors</Trans>
      </div>
      <div id="TableHeader">
        <div id="TimeRangeArea">
          <span className="Label">
            <Trans>Time Range</Trans>:&nbsp;&nbsp;
          </span>
          {timeRangeStart.format('YYYY-MM-DD')}&nbsp;
          <span className="TimeRangeDiffIcon">
            <HeightIcon />
          </span>
          &nbsp;&nbsp;
          {timeRangeEnd.format('YYYY-MM-DD')}
        </div>
        <div id="CountArea">
          <span className="Label">
            <Trans>Count</Trans>:
          </span>{' '}
          {membershipHonors.length}
        </div>
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
                <Trans>Years</Trans>
              </TableSortLabel>
            </th>
            <th className="lastname">
              <TableSortLabel
                active={sorting.column === 'lastname'}
                direction={sorting.direction}
                onClick={() => changeSorting('lastname')}
              >
                <Trans>Lastname</Trans>
              </TableSortLabel>
            </th>
            <th className="firstname">
              <TableSortLabel
                active={sorting.column === 'firstname'}
                direction={sorting.direction}
                onClick={() => changeSorting('firstname')}
              >
                <Trans>Firstname</Trans>
              </TableSortLabel>
            </th>
            <th className="street">
              <TableSortLabel
                active={sorting.column === 'street'}
                direction={sorting.direction}
                onClick={() => changeSorting('street')}
              >
                <Trans>Street</Trans>
              </TableSortLabel>
            </th>
            <th className="postcode">
              <TableSortLabel
                active={sorting.column === 'postcode'}
                direction={sorting.direction}
                onClick={() => changeSorting('postcode')}
              >
                <Trans>Postcode</Trans>
              </TableSortLabel>
            </th>
            <th className="city">
              <TableSortLabel
                active={sorting.column === 'city'}
                direction={sorting.direction}
                onClick={() => changeSorting('city')}
              >
                <Trans>City</Trans>
              </TableSortLabel>
            </th>
            <th className="dateOfBirth">
              <TableSortLabel
                active={sorting.column === 'dateOfBirth'}
                direction={sorting.direction}
                onClick={() => changeSorting('dateOfBirth')}
              >
                <Trans>Date of birth</Trans>
              </TableSortLabel>
            </th>
            <th className="joinedAt">
              <TableSortLabel
                active={sorting.column === 'joinedAt'}
                direction={sorting.direction}
                onClick={() => changeSorting('joinedAt')}
              >
                <Trans>Member since</Trans>
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
