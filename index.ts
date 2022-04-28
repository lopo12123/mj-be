// region types
import type { IOType } from "./types/io";
import type { Express } from "express";
// endregion

// region deps
// import * as express from "express";
const express = require("express");
import { Server } from "http";
import { Server as IOServer } from "socket.io";
import { setupIO } from "./src/io";
import { setupExpress } from "./src/express";
// endregion

// config
const HOST = '127.0.0.1'
const PORT = 8899
// endregion

// middleware
const app: Express = express()
const http = new Server(app)
const io: IOType = new IOServer(http)
// endregion

// region bind event
setupIO(io)
setupExpress(app)
// endregion

// region start
http.listen(PORT, HOST, () => {
    console.log(`server run at ${ HOST }:${ PORT }`)
})
// endregion