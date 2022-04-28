import { Namespace, Server, Socket } from "socket.io";

/**
 * @description 服务端发送/广播事件
 * [docs]{@link https://socket.io/docs/v4/typescript/#types-for-the-server}
 * @example
 * interface Events_Server2Client {
 *     noArg: () => void;
 *     basicEmit: (a: number, b: string, c: Buffer) => void;
 *     withCallback: (d: string, callback: (e: number) => void) => void;
 * }
 *
 * // server side
 * io.on('connection', (socket) => {
 *     socket.emit('noArg')
 *     socket.emit('basicEmit', 1, "2", Buffer.from([3]))
 *     socket.emit('withCallback', '4', (e) => {
 *         // e is inferred as number
 *     })
 *
 *     // works too when broadcast to all
 *     io.emit('noArg')
 *
 *     // works too when broadcast to a room
 *     io.to('room1').emit('noArg')
 * })
 *
 * // client side
 * socket.on('noArg', () => {
 *     // ...
 * })
 * socket.on('basicEmit', (a, b, c) => {
 *     // a is inferred as number
 *     // b as string
 *     // and c as buffer
 * })
 * socket.on('withCallback', (d, callback) => {
 *     // d is inferred as string
 *     // and callback as a function that takes a number as argument
 * })
 */
interface Server2Client {

}

/**
 * @description 服务端接受的事件
 * [docs]{@link https://socket.io/docs/v4/typescript/#types-for-the-server}
 * @example
 * interface Events_Client2Server {
 *     hello: (msg: string) => void
 * }
 *
 * // server side
 * io.on('connection', (socket) => {
 *     socket.on('hello', () => {
 *         // ...
 *     })
 * })
 *
 * // client side
 * socket.emit('hello')
 */
interface Client2Server {

}

/**
 * @description io实例上的事件
 * [docs]{@link https://socket.io/docs/v4/typescript/#types-for-the-server}
 * @example
 * interface InterServerEvents {
 *   ping: (a: boolean) => void
 * }
 *
 * io.on('ping', (flag) => {
 *     // flag is inferred as boolean
 * })
 */
interface InterServerEvents {

}

/**
 * @description socket.data上的属性
 * [docs]{@link https://socket.io/docs/v4/typescript/#types-for-the-server}
 * @example
 * interface SocketData {
 *     name: string
 *     age: number
 * }
 *
 * io.on('connection', (socket) => {
 *     socket.data.name = 'name 1'
 *     socket.data.age = 2
 * })
 */
interface SocketData {

}

// 服务端io实例的类型
type IOType = Server<Client2Server, Server2Client, InterServerEvents, SocketData>
// 服务端namespace实例的类型
type NamespaceType = Namespace<Client2Server, Server2Client, InterServerEvents, SocketData>
// 服务端socket实例的类型
type SocketType = Socket<Client2Server, Server2Client, InterServerEvents, SocketData>

export type {
    Server2Client,
    Client2Server,
    InterServerEvents,
    SocketData,

    IOType,
    SocketType,
    NamespaceType,
}