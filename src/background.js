'use strict'

import { app, ipcMain, protocol, BrowserWindow } from 'electron'

const isDevelopment = process.env.NODE_ENV !== 'production'

let mainWindow
// 单一实例
const gotTheLock = app.requestSingleInstanceLock()
// 是否可以退出
let trayClose = false

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

const winURL = isDevelopment
    ? 'http://localhost:8080'
    : 'app://./index.html'

/**
 * 创建主窗口
 */

function createMainWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    // backgroundColor: '#797979',
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: true,
      enableRemoteModule: true
    }
  })
  require('./Menu.js')

  mainWindow.loadURL(winURL)

  if (isDevelopment && !process.env.IS_TEST) {
    mainWindow.webContents.openDevTools()
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createMainWindow()
  }
})

/**
 * 单一实例
 */
if (!gotTheLock) {
  app.quit()
} else {
  app.on('ready', async () => {
    createMainWindow()
  })
}

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
