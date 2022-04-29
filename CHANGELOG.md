todo  
- client端主动disconnect改为发送一个request-disconnect
  - 便于资源上锁, 房间信息线性更新. 否则无法预知先后顺序. (但不影响使用)
