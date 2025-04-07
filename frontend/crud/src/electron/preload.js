const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  signup: (formData) => ipcRenderer.invoke("signup", formData),
  login: (formData) => ipcRenderer.invoke("login", formData),
});