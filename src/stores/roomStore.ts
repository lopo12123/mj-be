import { v4 as UUID } from "uuid";

class SingleRoom {
    roomId: string

    info: [string, string, string, string]

    constructor() {
        this.roomId = UUID()
        this.info = ['', '', '', '']
    }

    count() {
        let count = 0
        for(let i = 0; i < 4; i ++) {
            if(this.info[i] !== '') count += 1
        }
        return count
    }

    /**
     * @description 添加一个连接, 并返回加入的位置
     */
    add(sessionId: string) {
        for(let i = 0; i < 4; i ++) {
            if(this.info[i] === '') {
                this.info[i] = sessionId
                return [true, i]
            }
        }
        return [false, -1]
    }

    /**
     * @description 指定设置某个位置的连接
     */
    set(index: number, sessionId: string) {
        this.info[index] = sessionId
    }
}

class RoomStore {
    private roomList: Map<string, SingleRoom> = new Map()

    private auto_clean() {
        for(let [k, v] of this.roomList) {
            if(v.count() === 0) this.roomList.delete(k)
        }
    }

    newRoom(sessionId: string) {
        this.auto_clean()
        const newRoom = new SingleRoom()
        newRoom.add(sessionId)
        this.roomList.set(newRoom.roomId, newRoom)
        return newRoom.roomId
    }

    has(roomId: string) {
        this.auto_clean()
        return this.roomList.has(roomId)
    }

    get(roomId: string) {
        this.auto_clean()
        return this.roomList.get(roomId) ?? null
    }

    count() {
        this.auto_clean()
        return this.roomList.size
    }
}

const roomStore = new RoomStore()
export const useRoomStore = () => roomStore