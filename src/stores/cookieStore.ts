const parseCookie = (cookie: string): { [k: string]: string } => {
    const res: { [k: string]: string } = {}
    cookie.split(';').forEach((pair) => {
        const [ k, v ] = pair.split('=')
        res[k.trim()] = v.trim()
    })
    return res
}

export {
    parseCookie
}