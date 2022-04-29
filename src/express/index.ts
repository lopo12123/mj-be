import { Express } from "express";
import * as path from "path";

const setupExpress = (ex: Express) => {
    ex.all('*', (req, res, next) => {
        res.header('Access-Control-Allow-Origin', req.hostname)
        next()
    })
    ex.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../static/test.html'))
    })

    ex.get('/ping', (req, res) => {
        res.json({ msg: 'pong' })
    })
}

export {
    setupExpress
}