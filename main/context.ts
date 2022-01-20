import path from 'path'
import { utils, readFile, writeFile } from 'xlsx'
import { Person } from './models/Person'
import { Mandate } from './models/Mandate'

const basePath = process.env.PORTABLE_EXECUTABLE_DIR
  ? process.env.PORTABLE_EXECUTABLE_DIR
  : __dirname

export interface Context {
  initDatabase(): void
  getPersons(): Promise<Person[]>
  getPerson(id: number | undefined): Promise<Person | null>
  getMandates(): Promise<Mandate[]>
  getMandate(id: number | undefined): Promise<Mandate | null>
  getIssuedMandatesOfPerson(personId: number): Promise<Mandate[]>
  writeData(persons: Person[], mandates: Mandate[]): Promise<void>
}

type DbPerson = {
  id: number
  firstname: string
  lastname: string
  street: string
  postcode: number
  city: string
  dateOfBirth: string
  joinedAt: string
  authorizationMandateId: number
}

type DbMandate = {
  id: number
  accountHolder: number
  amount: number
  signedAt: string
}

export const context: Context = {
  initDatabase: () => {
    const persons: Person[] = []
    const mandates: Mandate[] = []
    const personsSheet = utils.json_to_sheet(persons)
    const mandatesSheet = utils.json_to_sheet(mandates)
    const newWorkbook = utils.book_new()
    utils.book_append_sheet(newWorkbook, personsSheet, 'Persons')
    utils.book_append_sheet(newWorkbook, mandatesSheet, 'Mandates')
    writeFile(newWorkbook, path.join(basePath, 'Data.xlsx'))
  },

  getPersons: async () => {
    return new Promise(function (resolve, reject) {
      try {
        // Get workbook from file
        const workbook = readFile(path.join(basePath, 'Data.xlsx'))
        // Get data from persons sheet
        const data = utils.sheet_to_json(workbook.Sheets['Persons'])

        // Init list for persons
        const persons: Person[] = []

        // For each person from database
        data.forEach((person) => {
          // Cast to model person
          let newPerson = person as Person
          // Convert dateOfBirth attribute
          const dateOfBirthString = (person as DbPerson).dateOfBirth
          if (dateOfBirthString && dateOfBirthString !== '') {
            newPerson.dateOfBirth = new Date(dateOfBirthString)
          }

          // Convert joinedAt attribute
          const joinedAtString = (person as DbPerson).joinedAt
          if (joinedAtString && joinedAtString !== '') {
            newPerson.joinedAt = new Date(joinedAtString)
          }
          // Add person to list
          persons.push(newPerson)
        })

        // Resolve promise
        resolve(persons)
      } catch (error) {
        // Reject promise with error
        reject(error)
      }
    })
  },

  getPerson: async (id) => {
    return new Promise(async function (resolve, reject) {
      const person = (await context.getPersons()).find(
        (person) => person.id === id
      )

      if (person) {
        resolve(person)
      } else {
        resolve(null)
      }
    })
  },

  getMandates: async () => {
    return new Promise(function (resolve, reject) {
      try {
        // Get workbook from file
        const workbook = readFile(path.join(basePath, 'Data.xlsx'))
        // Get data from mandates sheet
        const data = utils.sheet_to_json(workbook.Sheets['Mandates'])

        // Init list for mandates
        const mandates: Mandate[] = []

        // For each mandate from database
        data.forEach((mandate) => {
          // Cast to model mandate
          let newMandate = mandate as Mandate
          // Set date attributes
          newMandate.signedAt = new Date((mandate as DbMandate).signedAt)
          // Add mandate to list
          mandates.push(newMandate)
        })

        // Resolve promise
        resolve(mandates)
      } catch (error) {
        // Reject promise with error
        reject(error)
      }
    })
  },

  getMandate: async (id) => {
    return new Promise(async function (resolve, reject) {
      const mandate = (await context.getMandates()).find(
        (mandate) => mandate.id === id
      )

      if (mandate) {
        resolve(mandate)
      } else {
        resolve(null)
      }
    })
  },

  getIssuedMandatesOfPerson: async (id) => {
    return new Promise(async function (resolve, reject) {
      try {
        const mandates = (await context.getMandates()).filter(
          (mandate) => mandate.accountHolderId === id
        )
        resolve(mandates)
      } catch (error) {
        reject(error)
      }
    })
  },

  writeData: (persons, mandates) => {
    return new Promise(async function (resolve, reject) {
      try {
        const personsSheet = utils.json_to_sheet(persons)
        const mandatesSheet = utils.json_to_sheet(mandates)
        const newWorkbook = utils.book_new()
        utils.book_append_sheet(newWorkbook, personsSheet, 'Persons')
        utils.book_append_sheet(newWorkbook, mandatesSheet, 'Mandates')
        writeFile(newWorkbook, path.join(basePath, 'Data.xlsx'))
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  },
}
