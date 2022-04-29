import { v4 as UUID } from "uuid";

class SingleRoom {
    private readonly roomId: string
    private clients: string[] = []

    get id() {
        return this.roomId
    }

    constructor(clientId: string) {
        this.roomId = UUID()
        this.clients.push(clientId)
    }

    /**
     * @description 返回当前的client数量
     */
    count() {
        return this.clients.length
    }

    /**
     * @description 添加一个连接, 并返回加入的位置
     */
    add(clientId: string) {
        this.clients.push(clientId)
    }

    /**
     * @description 将目标client移除
     * @param clientId
     */
    remove(clientId: string) {
        const index = this.clients.findIndex((client) => client === clientId)
        if(index !== -1) this.clients.splice(index, 1)

        roomStore.auto_clean()
    }
}

class RoomStore {
    private roomList: Map<string, SingleRoom> = new Map()

    /**
     * @description 自动清理没有client的room
     */
    auto_clean() {
        for (let [ k, v ] of this.roomList) {
            if(v.count() === 0) this.roomList.delete(k)
        }
    }

    /**
     * @description 新建room
     */
    newRoom(clientId: string) {
        this.auto_clean()
        const newRoom = new SingleRoom(clientId)
        this.roomList.set(newRoom.id, newRoom)
        return newRoom.id
    }

    /**
     * @description 判断目标room是否存在
     */
    checkRoom(roomId: string) {
        this.auto_clean()
        return this.roomList.has(roomId)
    }

    /**
     * @description 获取目标room, 不存在则返回null
     */
    getRoom(roomId: string) {
        this.auto_clean()
        return this.roomList.get(roomId) ?? null
    }

    /**
     * @description 返回room数量
     */
    count() {
        this.auto_clean()
        return this.roomList.size
    }
}

const roomStore = new RoomStore()
export const useRoomStore = () => roomStore