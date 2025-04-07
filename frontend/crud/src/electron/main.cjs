const { app, BrowserWindow, ipcMain,session } = require("electron");
const path = require("path");
const axios = require("axios");

async function signIn(email, password) {
    const response = await axios.post('https://api.com/signin', { email, password });
    return response.data;
  }
function createMainWindow() {
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
        preload: path.join(__dirname, "preload.js"),
        contextIsolation: true,
        nodeIntegration: false
    },
  });
  let mainSession=mainWindow.webContents.session;

  cookie = {
    url: 'http://localhost:5173/#', // must be set
    name: 'myCookie',
    value: 'cookieValue',
    expirationDate: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // 1 week from now
    path: '/',
    secure: true,
    httpOnly: false
  };


  if (process.env.NODE_ENV === "development") {
    mainWindow.loadURL("http://localhost:5173");
    
    
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, "../../dist/index.html"));
  }
}

app.whenReady().then(() => {
  createMainWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
  });
});


ipcMain.handle("signup", async (_event, formData) => {
  try {
    const res = await axios.post("http://localhost:5000/api/auth/signup", formData, {
      headers: { "Content-Type": "application/json" },
    });
    return { success: true,  };
  } catch (err) {
    console.error("Signup error:", err.message);
    return { success: false, error: err.message };
  }
});

ipcMain.handle("login", async (_event, formData) => {
  try {
    const res = await axios.post("http://localhost:5000/api/auth/login", formData, {
      headers: { "Content-Type": "application/json" },
    });
    console.log(res,'res')

    // You could extract a token or user and set cookies here if needed
    // Example: Set auth cookie
    // await session.defaultSession.cookies.set({...})

    return { success: true,  };
  } catch (err) {
    console.error("Login error:", err.message,"llo");
    return { success: false, error: err.message };
  }
});
