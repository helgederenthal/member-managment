import moment, { Moment } from 'moment'
import './Dashboard.css'

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

function Dashboard() {
  const homer = moment(new Date('1984-10-10T00:00:00Z')).utc()
  const marge = moment(new Date('1987-07-08T00:00:00Z')).utc()

  const start = moment(new Date('2021-05-15T00:00:00Z')).utc()
  const end = moment(new Date('2022-08-06T00:00:00Z')).utc()

  return (
    <div>
      {start.format('YYYY-MM-DD')} &nbsp;-&gt; {end.format('YYYY-MM-DD')}
      <br />
      <br />
      <br />
      {homer.format('YYYY-MM-DD')}
      <br />
      {getAnniversariesOfDateInTimespan(homer, start, end).map((anni) => {
        return anni + ' '
      })}
      <br />
      <br />
      <br />
      {marge.format('YYYY-MM-DD')}
      <br />
      {getAnniversariesOfDateInTimespan(marge, start, end).map((anni) => {
        return anni + ' '
      })}
      <br />
      <br />
      <br />
    </div>
  )
}

export default Dashboard
