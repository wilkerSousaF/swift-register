const { app, BrowserWindow } = require('electron')

function createWindow () {
    const win = new BrowserWindow({
        width: 760,
        height: 620,
        webPreferences: {
            nodeIntegration: true
        }
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