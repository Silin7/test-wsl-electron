'use strict'

import { Menu } from 'electron'
const winURL = process.env.NODE_ENV === 'development' ?
    `http://localhost:8080` :
    `file://${__dirname}/index.html`
const  template = [
    // {
    //     label: '公司信息',
    //     submenu: [
    //         {
    //             label: '基本信息维护',
    //             click: (event, focusedWindow, focusedWebContents)=>{
    //                 toPage(focusedWindow, 'bukrs')
    //             }
    //         }
    //     ]
    // }
]
function toPage(bw, name) {
    bw.loadURL(winURL+'#/'+name)
}
const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
