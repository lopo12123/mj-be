// region types
import type { IOType } from "./src/types/io";
import type { Express } from "express";
// endregion

// region deps
const express = require("express");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const sharedSession = require("express-socket.io-session");
import { Server } from "http";
import { Server as IOServer } from "socket.io";
import { setupIO } from "./src/io";
import { setupExpress } from "./src/express";
// endregion

// config
const HOST = '127.0.0.1'
const PORT = 8899
const app: Express = express()
const http = new Server(app)
const io: IOType = new IOServer(http, { cors: { origin: 'http://localhost:3000', credentials: true } })
// endregion

// middleware
const sessionConfig = expressSession({
    name: 'sessionId',
    secret: 'salt',
    cookie: {
        maxAge: 60 * 60 * 1000  // 60min
    },
    resave: false,
    saveUninitialized: false
})
app.use(cookieParser())
app.use(sessionConfig)
io.use(sharedSession(sessionConfig, { autoSave: true }))
// endregion

// region bind event
setupExpress(app)
setupIO(io)
// endregion

// region start
http.listen(PORT, HOST, () => {
    console.log(`server run at ${ HOST }:${ PORT }`)
})
// endregion