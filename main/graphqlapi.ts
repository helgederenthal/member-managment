import { ipcMain, BrowserWindow } from 'electron'

const GraphQlApi = (window: BrowserWindow) => {
  let apiPort: Number = 0

  const initializeApi = async () => {
    apiPort = 5000
  }

  ipcMain.on('getApiDetails', () => {
    if (apiPort !== 0) {
      console.log('Send port ' + apiPort)
      window.webContents.send('apiDetails', apiPort)
    } else {
      initializeApi()
        .then(() => {
          console.log('Send port ' + apiPort)
          window.webContents.send('apiDetails', apiPort)
        })
        .catch(() => {
          window.webContents.send('apiDetailsError', 'Error initializing API')
        })
    }
  })
}

export default GraphQlApi
