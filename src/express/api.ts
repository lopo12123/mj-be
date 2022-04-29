import { Router } from "express";
import { useRoomStore } from "../stores/roomStore";

const apiRouter = Router()

// region 请求一个新的room
apiRouter.get('/new-room', (req, res) => {
    const newRoomId = useRoomStore().newRoom()
    res.cookie('room-id', newRoomId)
        .json({ roomId: newRoomId })
})
// endregion


export default apiRouter