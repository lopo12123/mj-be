import { Express } from "express";
import * as path from "path";

const setupExpress = (ex: Express) => {
    ex.all('*', (req, res, next) => {
        res.header('Access-Control-Allow-Origin', req.hostname)
        next()
    })
    ex.get('/', (req, res) => {
        // @ts-ignore
        req.session.views = (req.session.views ?? 0) + 1
        res.sendFile(path.resolve(__dirname, '../static/test.html'))
    })

    ex.get('/ping', (req, res) => {
        // @ts-ignore
        req.session.views = (req.session.views ?? 0) + 1
        // console.log(req.session, req.cookies)
        // @ts-ignore
        res.json({ msg: 'pong', views: req.session.views })
    })
}

export {
    setupExpress
}