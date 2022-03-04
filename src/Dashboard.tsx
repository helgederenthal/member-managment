import { gql, useQuery } from '@apollo/client'
import moment, { Moment } from 'moment'
import './Dashboard.css'

const start = moment(new Date('2021-08-28T00:00:00Z')).utc()
const end = moment(new Date('2022-04-22T00:00:00Z')).utc()

// // Init birthday lists
// const birthdayHonors = [50, 60, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120]

// Init membership lists
const membershipYearsToHonor = [15, 25, 40, 50]
const membershipHonors = new Map<number, Person[]>()

function initMembershipHonors(membershipYearsToHonor: number[]) {
  membershipHonors.clear()
  for (const years of membershipYearsToHonor) {
    membershipHonors.set(years, [])
  }
}

function getAnniversariesOfDateInTimespan(
  date: Moment,
  timespanStart: Moment,
  timespanEnd: Moment
): number[] {
  // Copy parameters to local instances
  date = moment(date)
  timespanStart = moment(timespanStart)
  timespanEnd = moment(timespanEnd)

  // If end is before start
  if (timespanEnd.isBefore(timespanStart)) {
    // Swap start and end
    let temp = timespanEnd
    timespanEnd = timespanStart
    timespanStart = temp
  }

  // Init list for anniversaries
  let anniversaries = []

  // Init list of tuples for separate timespans
  let timespans = []

  // Divide timespan in parts for separate years
  while (timespanEnd.year() > timespanStart.year()) {
    let subTimespanStart = moment(timespanStart)
    let subTimespanEnd = moment(timespanStart.endOf('year'))
    timespans.push([subTimespanStart, subTimespanEnd])

    timespanStart = timespanStart.add(1, 'year').startOf('year')
  }
  timespans.push([timespanStart, timespanEnd.endOf('day')])

  // For each timespan
  for (let ts of timespans) {
    let year = ts[0].year()
    let dateInYear = moment(date).year(year)

    if (dateInYear.isBetween(ts[0], ts[1])) {
      anniversaries.push(year - date.year())
    }
  }

  return anniversaries
}

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

function Dashboard() {
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

  initMembershipHonors(membershipYearsToHonor)

  for (const person of persons) {
    // Get membership anniversaries for current person
    const membershipAnniversaries = getAnniversariesOfDateInTimespan(
      moment(person.joinedAt).utc(),
      start,
      end
    )
    for (const ma of membershipAnniversaries) {
      if (Array.from(membershipHonors.keys()).includes(ma)) {
        membershipHonors.get(ma)?.push(person)
      }
    }
  }

  return (
    <div id="Dashboard">
      <h1>Membership Honors</h1>
      <h3>
        {start.format('YYYY-MM-DD')} &nbsp;-&gt; {end.format('YYYY-MM-DD')}
      </h3>
      <table className="table">
        <thead className="header">
          <tr>
            <th className="years">Years</th>
            <th className="lastname">Lastname</th>
            <th className="firstname">Firstname</th>
          </tr>
        </thead>
        <tbody className="body">
          <>
            {membershipYearsToHonor.map((key) => {
              return membershipHonors.get(key)?.map((person) => {
                return (
                  <tr key={person.id}>
                    <td className="years">{key}</td>
                    <td className="lastname">{person.lastname}</td>
                    <td className="firstname">{person.firstname}</td>
                  </tr>
                )
              })
            })}
          </>
        </tbody>
      </table>
    </div>
  )
}

export default Dashboard
