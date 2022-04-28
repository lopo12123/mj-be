export const Logger = (msg: string, title: string = '') => {
    const timestamp = new Date().toLocaleString()
    console.log(`[${timestamp}]: ${title} ${msg}`)
}