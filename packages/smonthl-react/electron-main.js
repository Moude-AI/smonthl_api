const { app, BrowserWindow } = require('electron');

let mainWindow;

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: true
    },
    backgroundColor: '#000000',
    frame: true,
    transparent: false
  });

  // Load from Vercel deployment
  const VERCEL_URL = 'https://smonthl-demo.vercel.app/';
  
  console.log('Loading from Vercel:', VERCEL_URL);
  mainWindow.loadURL(VERCEL_URL);
  
  // Open DevTools in development
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
