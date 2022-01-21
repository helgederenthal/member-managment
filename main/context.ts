import fs from 'fs'
import path from 'path'
import { utils, readFile, writeFile } from 'xlsx'
import { Person } from './models/Person'
import { Mandate } from './models/Mandate'

export interface Context {
  getPersons(): Promise<Person[]>
  getPerson(id: number | undefined): Promise<Person | null>
  getMandates(): Promise<Mandate[]>
  getMandate(id: number | undefined): Promise<Mandate | null>
  getIssuedMandatesOfPerson(personId: number): Promise<Mandate[]>
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

export class context implements Context {
  databaseFilePath: string
  persons: Person[]
  mandates: Mandate[]

  constructor() {
    console.log('Creating database context ...')
    // Get path to database file
    this.databaseFilePath = path.join(
      process.env.PORTABLE_EXECUTABLE_DIR
        ? process.env.PORTABLE_EXECUTABLE_DIR
        : __dirname,
      'Data.xlsx'
    )

    // If database file does not exist
    if (!fs.existsSync(this.databaseFilePath)) {
      this.initDatabase()
    }

    // Read data from database file
    this.getDataFromFile()
  }

  initDatabase() {
    console.log('Initializing database ...')
    // Cleat lists for persons and mandates
    this.persons = []
    this.mandates = []
    // Write empty lists to database file
    this.writeDataToFile()
  }

  getDataFromFile() {
    // Get workbook from file
    console.log(`Reading file "${this.databaseFilePath}" ...`)
    const workbook = readFile(this.databaseFilePath)
    // Get data from persons sheet
    const personsData = utils.sheet_to_json(workbook.Sheets['Persons'])
    // Get data from mandates sheet
    const mandatesData = utils.sheet_to_json(workbook.Sheets['Mandates'])

    // Clear list of persons
    this.persons = []
    // Clear list of mandates
    this.mandates = []

    // For each person from database
    personsData.forEach((person) => {
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
      this.persons.push(newPerson)
    })

    // For each mandate from database
    mandatesData.forEach((mandate) => {
      // Cast to model mandate
      let newMandate = mandate as Mandate
      // Set date attributes
      newMandate.signedAt = new Date((mandate as DbMandate).signedAt)
      // Add mandate to list
      this.mandates.push(newMandate)
    })
  }

  writeDataToFile(): void {
    // Create new xlsx workbook
    const newWorkbook = utils.book_new()
    // Create sheet for persons and mandates
    const personsSheet = utils.json_to_sheet(this.persons)
    const mandatesSheet = utils.json_to_sheet(this.mandates)
    // Add sheets to workbook
    utils.book_append_sheet(newWorkbook, personsSheet, 'Persons')
    utils.book_append_sheet(newWorkbook, mandatesSheet, 'Mandates')
    // Write workbook to file
    console.log(`Writing data to file "${this.databaseFilePath}" ...`)
    writeFile(newWorkbook, this.databaseFilePath)
  }

  async getPersons(): Promise<Person[]> {
    const persons = this.persons
    return new Promise(async function (resolve, reject) {
      resolve(persons)
    })
  }

  async getPerson(id: number | undefined): Promise<Person | null> {
    const persons = this.persons
    return new Promise(async function (resolve, reject) {
      // If no id given
      if (!id) resolve(null)

      // Find person in list
      const person = persons.find((person) => person.id === id)

      // If person found
      if (person) {
        // Return person
        resolve(person)
      } else {
        // Return null
        resolve(null)
      }
    })
  }

  async getMandates(): Promise<Mandate[]> {
    const mandates = this.mandates
    return new Promise(async function (resolve, reject) {
      resolve(mandates)
    })
  }

  async getMandate(id: number | undefined): Promise<Mandate | null> {
    const mandates = this.mandates
    return new Promise(async function (resolve, reject) {
      // If no id given
      if (!id) resolve(null)

      // Find mandate in list
      const mandate = mandates.find((mandate) => mandate.id === id)

      // If mandate found
      if (mandate) {
        // Return mandate
        resolve(mandate)
      } else {
        // Return null
        resolve(null)
      }
    })
  }

  async getIssuedMandatesOfPerson(id: number): Promise<Mandate[]> {
    const mandates = this.mandates
    return new Promise(async function (resolve, reject) {
      try {
        const issuedMandates = mandates.filter(
          (mandate) => mandate.accountHolderId === id
        )
        resolve(issuedMandates)
      } catch (error) {
        reject(error)
      }
    })
  }
}
