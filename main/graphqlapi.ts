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

    try {
      let schema = await tq.buildSchema({
        resolvers: [PersonResolver, MandateResolver, MandateCreateInput],
        scalarsMap: [{ type: GraphQLScalarType, scalar: DateTimeResolver }],
      })

      // Create database context
      const contextObject = new context()

      console.log('Starting Apollo Server ...')
      new ApolloServer({ schema, context: contextObject }).listen(
        { port: apiPort },
        () => console.log(`Server ready at: http://localhost:${apiPort}`)
      )
    } catch (error) {
      console.log(error)
    }
  }

  ipcMain.on('getApiDetails', () => {
    if (apiPort !== 0) {
      console.log(`Sending port ${apiPort} to renderer`)
      window.webContents.send('apiDetails', apiPort)
    } else {
      initializeApi()
        .then(() => {
          console.log(`Sending port ${apiPort} to renderer`)
          window.webContents.send('apiDetails', apiPort)
        })
        .catch(() => {
          window.webContents.send('apiDetailsError', 'Error initializing API')
        })
    }
  })
}

export default GraphQlApi
