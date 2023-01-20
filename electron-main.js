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