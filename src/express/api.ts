import { Router } from "express";
import { useRoomStore } from "../stores/roomStore";
import { Logger } from "../scripts/Logger";

const apiRouter = Router()

// region 新建一个room, 并返回roomId
apiRouter.get('/new-room', (req, res) => {
    const newRoomId = useRoomStore().newRoom(req.cookies.clientId)

    Logger(`新增房间 [${ newRoomId }], 当前房间数: ${ useRoomStore().count() }`, `clientId= ${ req.cookies.clientId }`)
    res.cookie('roomId', newRoomId).json({ roomId: newRoomId })
})
// endregion

export default apiRouter