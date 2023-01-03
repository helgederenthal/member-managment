import moment, { Moment } from 'moment'
import Person from './interfaces/Person'

export interface Sorting {
  column: string
  direction: 'asc' | 'desc'
}

export function sortPersons(persons: Person[], sorting: Sorting): Person[] {
  // Init list of ordered persons
  let orderedPersons: Person[] = []

  // If persons are present
  if (persons) {
    try {
      if (sorting.column === 'dateOfBirthWithoutYear') {
        orderedPersons = [...persons].sort((a: Person, b: Person) => {
          if (
            sorting.direction === 'asc'
              ? a.dateOfBirth.substring(5) > b.dateOfBirth.substring(5)
              : a.dateOfBirth.substring(5) < b.dateOfBirth.substring(5)
          )
            return 1
          return -1
        })
      } else {
        // Order list of persons by string column
        orderedPersons = [...persons].sort((a: Person, b: Person) => {
          const valueA = (
            a[sorting.column as keyof typeof a] as string
          ).toLowerCase()
          const valueB = (
            b[sorting.column as keyof typeof b] as string
          ).toLowerCase()
          if (sorting.direction === 'asc' ? valueA > valueB : valueA < valueB)
            return 1
          return -1
        })
      }
    } catch {
      // Order list of persons by number column
      orderedPersons = [...persons].sort((a: Person, b: Person) => {
        const valueA = a[sorting.column as keyof typeof a] as number
        const valueB = b[sorting.column as keyof typeof b] as number
        if (sorting.direction === 'asc' ? valueA > valueB : valueA < valueB)
          return 1
        return -1
      })
    } finally {
      return orderedPersons
    }
  }
  return orderedPersons
}

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
