const maxAge = 30 * 60 * 1000 // 30min

class ClientStore {
    clients: Map<string, number> = new Map()

    /**
     * @description 更新过期时间
     */
    touch(clientId: string) {
        this.clients.set(clientId, Date.now() + maxAge)
    }

    /**
     * @description 判断是否过期
     * @param clientId
     */
    isExpired(clientId: string) {
        const life = this.clients.get(clientId)
        return life === undefined ? true : (life <= Date.now())
    }

    /**
     * @description 移除某client存储
     */
    kill(clientId: string) {
        this.clients.delete(clientId)
    }
}

const _ = new ClientStore()
export const useClientStore = () => _