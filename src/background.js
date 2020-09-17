'use strict'

import { app, ipcMain, protocol, BrowserWindow } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
// import db from './datastore'

// import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow, loginWindow
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

const loginURL = isDevelopment
    ? 'http://localhost:8080#/login'
    : 'app://./index.html#/login'

/**
 * 创建主窗口
 */
function createLoginWindow() {
  if (loginWindow) {
    return
  }

  /**
   * Initial window options
   */
  loginWindow = new BrowserWindow({
    show: true,
    height: 360,
    width: 300,
    maxHeight: 360,
    maxWidth: 300,
    // useContentSize: true,
    // frame: false, // 无边框
    // transparent: true, // 透明
    // // fullscreen: true, // 全屏,
    // resizable: false,
    // maximizable: false,
    // minimizable: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    },
  })

  loginWindow.setMenu(null)
  console.log(loginURL)

  loginWindow.loadURL(loginURL)
  console.log(isDevelopment)

  if (isDevelopment && !process.env.IS_TEST) {
    loginWindow.webContents.openDevTools()
  }

  // 为了防止闪烁，让画面准备好了再显示
  // 对于一个复杂的应用，ready-to-show 可能发出的太晚，会让应用感觉缓慢。 在这种情况下，建议立刻显示窗口，并使用接近应用程序背景的 backgroundColor
  // 请注意，即使是使用 ready-to-show 事件的应用程序，仍建议使用设置 backgroundColor 使应用程序感觉更原生。
  loginWindow.once('ready-to-show', () => {
    loginWindow.show()
  })

  loginWindow.on('close', (event) => {
    console.log("close")
    app.quit()
  })

  loginWindow.on('closed', () => {
    loginWindow = null
  })

  ipcMain.on('openMainWindow', () => {
    if (!mainWindow) {
      console.log("aaa")
      createMainWindow()
    }

    // loginWindow.hide()
    loginWindow.destroy()
    console.log(JSON.stringify(mainWindow))
    mainWindow.show()
    mainWindow.focus()
  })

  ipcMain.on('openLoginWindow', () => {
    if (!loginWindow) {
      createLoginWindow()
    }

    // loginWindow.hide()
    mainWindow.destroy()
    loginWindow.show()
    loginWindow.focus()
  })
}

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

  /**
   * 监听
   */

  // mainWindow.on('close', (event) => {
  //   if(process.platform === 'win32') {
  //     if (!trayClose) {
  //       // 最小化
  //       mainWindow.hide()
  //       event.preventDefault()
  //     }
  //   }
  // })

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.on('maximize', () => {

  })
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createMainWindow()
  }

  // if (loginWindow === null) {
  //   createLoginWindow()
  // }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// app.on('ready', async () => {
//   if (isDevelopment && !process.env.IS_TEST) {
//     // Install Vue Devtools
//     try {
//       // await installExtension(VUEJS_DEVTOOLS)
//     } catch (e) {
//       console.error('Vue Devtools failed to install:', e.toString())
//     }
//   }
//   createWindow()
//   require('./Menu.js')
//   // global.db = db
// })

/**
 * 单一实例
 */
if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // 当运行第二个实例时,将会聚焦到myWindow这个窗口
    // if (mainWindow) {
    //     if (mainWindow.isMinimized()) mainWindow.restore()
    //     mainWindow.focus()
    // }
    if (loginWindow) {
      loginWindow.focus()
    }
  })

  // 创建 mainWindow, 加载应用的其余部分, etc...
  app.on('ready', async () => {
    // if (!process.env.WEBPACK_DEV_SERVER_URL) {
    //   createProtocol('app')
    // }
    // createLoginWindow()
    createMainWindow()
    // createTray()
    // ipcStartOnBoot()
    // autoUpdate()
    // crashReport()
    // protocalHandler()
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
