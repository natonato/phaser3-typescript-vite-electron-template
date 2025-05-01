const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  send: (channel, data) => ipcRenderer.send(channel, data),
  invoke: (channel, data) => ipcRenderer.invoke(channel, data),
  on: (channel, listener) => ipcRenderer.on(channel, listener),
  removeListener: (channel, listener) =>
    ipcRenderer.removeListener(channel, listener),
});
