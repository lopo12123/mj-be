import { IOType } from "../types/io";

// 设置io响应
const setupIO = (io: IOType) => {
    io.on('connection', (socket) => {
        // @ts-ignore
        console.log(socket.id, socket.handshake.session)
        // @ts-ignore
        socket.handshake.session.ioView = (socket.handshake.session.ioView ?? 0) + 1
    })
}

export {
    setupIO
}