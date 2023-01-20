const { app, BrowserWindow } = require('electron')

function createWindow () {
    const win = new BrowserWindow({
        width: 760,
        height: 600,
        maxHeight: 600,
        maxWidth: 760,
        webPreferences: {
            nodeIntegration: true
        },
        maximizable: false,
        fullscreen: false,
        fullscreenable: false,
        simpleFullscreen: false,
        resizable: false,
        autoHideMenuBar: true,
    })

    win.loadFile('./dist/swift-register/index.html')
}

app.whenReady().then(createWindow)

const gotTheLock = app.requestSingleInstanceLock()
    
if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (win) {
      if (win.isMinimized()) win.restore()
      win.focus()
    }
  })
    
  // Create myWindow, load the rest of the app, etc...
  app.on('ready', () => {
  })
}

app.on('window-all-closed', () => {
    if(process.plataform !== 'darwin'){
        app.quit()
    }
})

app.on('activate', () => {
    if(BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})