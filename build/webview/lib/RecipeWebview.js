"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const electron_1=require("electron"),remote_1=require("@electron/remote"),fs_extra_1=require("fs-extra"),debug=require("debug")("Ferdi:Plugin:RecipeWebview");class RecipeWebview{constructor(e,t,r,n){this.badgeHandler=void 0,this.dialogTitleHandler=void 0,this.notificationsHandler=void 0,this.sessionHandler=void 0,this.loopFunc=()=>null,this.darkModeHandler=!1,this.badgeHandler=e,this.dialogTitleHandler=t,this.notificationsHandler=r,this.sessionHandler=n,electron_1.ipcRenderer.on("poll",(()=>{this.loopFunc(),debug("Poll event"),electron_1.ipcRenderer.sendToHost("alive")}))}get ipcRenderer(){return electron_1.ipcRenderer}get BrowserWindow(){return remote_1.BrowserWindow}loop(e){this.loopFunc=e}setBadge(e=0,t=0){this.badgeHandler.setBadge(e,t)}setDialogTitle(e){this.dialogTitleHandler.setDialogTitle(e)}safeParseInt(e){return this.badgeHandler.safeParseInt(e)}injectCSS(...e){e.forEach((e=>{if((0,fs_extra_1.pathExistsSync)(e)){const t=document.createElement("style");t.innerHTML=(0,fs_extra_1.readFileSync)(e,"utf8");const r=document.querySelector("head");r&&(r.append(t),debug("Append styles",t))}}))}injectJSUnsafe(...e){Promise.all(e.map((e=>(0,fs_extra_1.existsSync)(e)?(0,fs_extra_1.readFileSync)(e,"utf8"):(debug("Script not found",e),null)))).then((e=>{const t=e.filter((e=>null!==e));t.length>0&&(debug("Inject scripts to main world",t),electron_1.ipcRenderer.sendToHost("inject-js-unsafe",...t))}))}handleDarkMode(e){this.darkModeHandler=e}onNotify(e){"function"==typeof e&&(this.notificationsHandler.onNotify=e)}initialize(e){"function"==typeof e&&e()}clearStorageData(e,t){electron_1.ipcRenderer.send("clear-storage-data",{serviceId:e,targetsToClear:t})}releaseServiceWorkers(){this.sessionHandler.releaseServiceWorkers()}setAvatarImage(e){electron_1.ipcRenderer.sendToHost("avatar",e)}openNewWindow(e){electron_1.ipcRenderer.sendToHost("new-window",e)}}exports.default=RecipeWebview;