/**
 * File Name: main.js
 * Description: The main entry point/main process
 *
 * @author Analia Mok
 */

/* jshint esversion: 6 */

// Need to load index.html file

// From Electron itself
const {app, BrowserWindow} = require('electron');
// Path Module from nodejs core
const path = require('path');
// Url Module
const url = require('url');

// Live reload for file changes
require('electron-reload')(__dirname);

// Reference to window; need otherwise will immediately close
// to js garbage collection
let win;


// Creating browser window
function createWindow(){
    // Can pass a third property for a custom icon
    win = new BrowserWindow({width: 800, height: 600});
    win.setMenu(null);

    // Loading Index.html page
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    // Opening devtools
    //win.webContents.openDevTools();

    // Hooking into when window closes
    win.on('closed', () => {
        win = null;
    });

}

// Run create window function when ready
app.on('ready', createWindow);

// When all windows are closed
app.on('window-all-closed', () => {
    if(process.platform !== 'darwin'){
        app.quit();
    }
});
