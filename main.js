// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const autoUpdater = require('electron-updater').autoUpdater
autoUpdater.setFeedURL('https://bitbucket.org/ohjicin/ohjic-desktop-client.git')

const path = require('path')
const url = require('url')

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
//    webPreferences: {
//      preload: path.join(__dirname, 'preload.js')
//    }
  })
  var mac_address;
  var macaddress = require('macaddress');
  macaddress.one(function (err, mac) {
    console.log(mac);

    mainWindow.loadURL('http://fin.qfun.kr/index/intro/6/'+mac)
    //mainWindow.loadURL('http://fin.qfun.kr/deposit/sms/'+mac)
  });

  // and load the index.html of the app.
  //mainWindow.loadFile('index.html')
  //mainWindow.loadURL('http://fin.qfun.kr/deposit/sms/'+mac_address)
    
  // Open the DevTools.
  //mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.



autoUpdater.on('update-available', function () {
  console.log('A new update is available')
  contents.send('updater-message', 'A new update is available')
})
autoUpdater.on('checking-for-update', function () {
  console.log('Checking-for-update')
  contents.send('updater-message', 'Checking for Update..')
})
autoUpdater.on('error', function (error) {
  console.log('error')
  console.error(error)
  contents.send('updater-message', 'Got Error')
})
autoUpdater.on('download-progress', function (bytesPerSecond, percent, total, transferred) {
  console.log(`${bytesPerSecond}, ${percent}, ${total}, ${transferred}`)
  contents.send('updater-message', `download progress : ${bytesPerSecond}, ${percent}, ${total}, ${transferred}`)
})
autoUpdater.on('update-downloaded', function (event) {
  console.log('update-downloaded')
  console.log(event)
  contents.send('updater-message', 'update-downloaded')
})

autoUpdater.on('update-not-available', function () {
  console.log('update-not-available')
  contents.send('updater-message', 'update-not-available')
})