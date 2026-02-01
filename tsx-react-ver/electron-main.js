const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let mainWindow;
let viteProcess;

// Start Vite dev server
function startViteServer() {
  return new Promise((resolve, reject) => {
    console.log('Starting Vite dev server...');
    viteProcess = spawn('npm', ['run', 'dev'], {
      cwd: __dirname,
      shell: true,
      stdio: 'pipe'
    });

    viteProcess.stdout.on('data', (data) => {
      const output = data.toString();
      console.log(output);
      
      // Wait for Vite to be ready
      if (output.includes('Local:') || output.includes('localhost:5173')) {
        console.log('Vite server is ready!');
        setTimeout(() => resolve(), 1000); // Give it a moment to fully start
      }
    });

    viteProcess.stderr.on('data', (data) => {
      console.error(`Vite error: ${data}`);
    });

    viteProcess.on('close', (code) => {
      console.log(`Vite process exited with code ${code}`);
    });

    // Timeout after 30 seconds
    setTimeout(() => {
      resolve(); // Resolve anyway to prevent hanging
    }, 30000);
  });
}

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false
    },
    backgroundColor: '#000000',
    frame: true,
    transparent: false
  });

  // In development, start Vite and load from dev server
  if (process.env.NODE_ENV === 'development') {
    await startViteServer();
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    // In production, load from built files
    mainWindow.loadFile(path.join(__dirname, 'dist', 'index.html'));
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

// Clean up Vite process on exit
app.on('before-quit', () => {
  if (viteProcess) {
    console.log('Stopping Vite server...');
    viteProcess.kill();
  }
});

process.on('exit', () => {
  if (viteProcess) {
    viteProcess.kill();
  }
});
