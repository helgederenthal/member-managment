import fs from 'fs'
import path from 'path'
import { ipcMain, BrowserWindow } from 'electron'
import { ApolloServer } from 'apollo-server'
import { GraphQLScalarType } from 'graphql'
import { DateTimeResolver } from 'graphql-scalars'
import * as tq from 'type-graphql'
import { context } from './context'
import { PersonResolver } from './resolvers/PersonResolver'
import {
  MandateCreateInput,
  MandateResolver,
} from './resolvers/MandateResolver'

const GraphQlApi = (window: BrowserWindow) => {
  let apiPort: Number = 0

  const initializeApi = async () => {
    console.log('Initializing API ...')
    apiPort = 5000
    console.log(`  ... Setting api port to ${apiPort}`)

    // Get currenct directory
    const basePath = process.env.PORTABLE_EXECUTABLE_DIR
      ? process.env.PORTABLE_EXECUTABLE_DIR
      : __dirname

    // Get path to database
    const databasePath = path.join(basePath, 'Data.xlsx')

    // If database does not exist
    if (!fs.existsSync(databasePath)) {
      context.initDatabase()
    }

    try {
      let schema = await tq.buildSchema({
        resolvers: [PersonResolver, MandateResolver, MandateCreateInput],
        scalarsMap: [{ type: GraphQLScalarType, scalar: DateTimeResolver }],
      })

      console.log('  ... Starting Apollo Server')
      new ApolloServer({ schema, context: context }).listen(
        { port: apiPort },
        () => console.log(`Server ready at: http://localhost:${apiPort}`)
      )
    } catch (error) {
      console.log(error)
    }
  }

  ipcMain.on('getApiDetails', () => {
    if (apiPort !== 0) {
      console.log(`Send port ${apiPort} to renderer`)
      window.webContents.send('apiDetails', apiPort)
    } else {
      initializeApi()
        .then(() => {
          console.log(`Send port ${apiPort} to renderer`)
          window.webContents.send('apiDetails', apiPort)
        })
        .catch(() => {
          window.webContents.send('apiDetailsError', 'Error initializing API')
        })
    }
  })
}

export default GraphQlApi
