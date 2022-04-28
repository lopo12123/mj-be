import { Express } from "express";

const setupExpress = (ex: Express) => {
    ex.get('/', (req, res) => {
        res.json({
            msg: 'success'
        })
    })
}

export {
    setupExpress
}