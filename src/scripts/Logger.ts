export const Logger = (msg: string, title: string = '') => {
    const timestamp = new Date().toLocaleString('zh-cn', { hour12: false })
    console.log(`[${ timestamp }]: ${ title ? '<' + title + '>' : '' }${ msg }`)
}