'use strict'

import { Menu } from 'electron'
const winURL = process.env.NODE_ENV === 'development' ?
    `http://localhost:8080` :
    `file://${__dirname}/index.html`
const  template = [
    {
        label: '公司信息',
        submenu: [
            {
                label: '基本信息维护',
                click: (event, focusedWindow, focusedWebContents)=>{
                    toPage(focusedWindow, 'bukrs')
                }
            }
        ]
    }, {
        label: '月报',
        submenu: [
            {
                label: '财务公司资金集中度变化一览表',
                click: (event, focusedWindow, focusedWebContents)=>{
                    // toPage(focusedWindow, 'bukrs')
                }
            }, { type: 'separator' }, {
                label: '财务公司卖出回购、拆借业务月报表'
            }, { type: 'separator' }, {
                label: '财务公司承兑汇票业务月报表'
            }, { type: 'separator' }, {
                label: '不良贷款主要指标月度进展情况表'
            }, { type: 'separator' }, {
                label: '信贷支持产业链核心企业情况表'
            }, { type: 'separator' }, {
                label: '财务公司运营监测报表'
            }
        ]
    }, {
        label: '季报',
        submenu: [
            {
                label: '企业集团经营指标统计表'
            }, { type: 'separator' }, {
                label: '集团发债明细统计表（含成员单位）'
            }, { type: 'separator' }, {
                label: '企业集团财务公司为集团节约成本费用统计表'
            }, { type: 'separator' }, {
                label: '小微企业贷款利息收入免征增值税情况表'
            }
        ]
    }, {
        label: '半年报',
        submenu: [
            {
                label: '财务公司所属集团企业基本情况统计表',
                click: (event, focusedWindow, focusedWebContents)=>{
                    toPage(focusedWindow, 'bukrsinfo')
                }
            }, { type: 'separator' }, {
                label: '财务公司基本情况统计表'
            }, { type: 'separator' }, {
                label: '财务公司董事及高管人员统计表'
            }, { type: 'separator' }, {
                label: '财务公司创新业务资质情况统计表'
            }
        ]
    }
]
function toPage(bw, name) {
    bw.loadURL(winURL+'#/'+name)
}
const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
