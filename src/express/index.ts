import { Express } from "express";
import * as path from "path";
import apiRouter from "./api";
import { v4 } from "uuid";

const session_timeout = 30 * 60 * 1000  // 60min

const setupExpress = (ex: Express) => {
    // region 设置请求头 允许跨域
    ex.all('*', (req, res, next) => {
        res.header('Access-Control-Allow-Origin', req.hostname)
        res.cookie('SESSIONID', (req.cookies.SESSIONID ?? v4()), { maxAge: session_timeout })
        next()
    })
    // endregion

    // region 根路径 - 返回前端文件
    ex.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../static/test.html'))
    })
    // endregion

    // region 测试 ping-pong
    ex.get('/ping', (req, res) => {
        res.json({ msg: 'pong' })
    })
    // endregion

    ex.use('/api', apiRouter)
}

export {
    setupExpress
}