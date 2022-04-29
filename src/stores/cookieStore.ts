const parseCookie = (cookie: string): {[k: string]: string} => {
    const res: {[k: string]: string} = {}
    cookie.split(';').forEach((pair) => {
        const [k, v] = pair.trim().split('=')
        res[k] = v
    })
    return res
}

export {
    parseCookie
}