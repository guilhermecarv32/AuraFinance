import { contextBridge } from 'electron'

contextBridge.exposeInMainWorld('aura', {
  platform: process.platform,
})
