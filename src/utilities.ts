import moment, { Moment } from 'moment'

export function getAnniversariesOfDateInTimespan(
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

    // If date is in timespan (include start and end)
    if (dateInYear.isBetween(ts[0], ts[1], undefined, '[]')) {
      anniversaries.push(year - date.year())
    }
  }

  return anniversaries
}
