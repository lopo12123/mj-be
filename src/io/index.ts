import { IOType, SocketType } from "../types/io";
import { Logger } from "../scripts/Logger";
import { parseCookie } from "../stores/cookieStore";
import { useClientStore } from "../stores/clientStore";
import { useRoomStore } from "../stores/roomStore";

// region 统计并打印当前socket数量
const countSocket = (io: IOType) => {
    io.allSockets()
        .then((all) => {
            Logger(`当前socket连接数: ${ all.size }`, 'async')
        })
        .catch((err) => {
            Logger(err.toString(), 'Error')
        })
}
// endregion

// region socket断开连接打印
/**
 * @description socket断开连接打印并执行函数
 * @param socket 目标socket
 * @param slotFn 断开连接后执行的函数 (可选)
 */
const setDisconnectLog = (socket: SocketType, slotFn?: () => void) => {
    socket.on('disconnecting', () => {
        const cookies = parseCookie(socket.request.headers.cookie ?? '')

        // 将此client的id从存储中删去
        useClientStore().kill(cookies.clientId)
        // 将此client从其房间中移除
        useRoomStore().getRoom(cookies.roomId)?.remove(cookies.clientId)

        Logger('正在断开连接', `clientId= ${ cookies.clientId }`)

        socket.on('disconnect', () => {
            Logger('已断开连接', `clientId= ${ cookies.clientId }`)

            slotFn?.()
        })
    })
}
// endregion

// 设置io响应
const setupIO = (io: IOType) => {
    io.on('connection', (socket) => {
        countSocket(io)


        // region [request-disconnect] c端请求断开连接 - s端主动断开
        socket.on('request-disconnect', () => {
            const cookies = parseCookie(socket.request.headers.cookie ?? '')
            Logger('正在断开连接', `clientId= ${ cookies.clientId }`)
            socket.disconnect(true)
            Logger('已断开连接', `clientId= ${ cookies.clientId }`)
        })
        // endregion

        // region 刷新、关闭页面 等方式直接断开连接
        setDisconnectLog(socket, () => {
            countSocket(io)
        })
        // endregion
    })
}

export {
    setupIO
}