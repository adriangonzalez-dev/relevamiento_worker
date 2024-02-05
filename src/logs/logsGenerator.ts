import fs from 'fs'
import path from 'path'

export const logGenerator = (message:any) => {
    const newLine:string = `\n[${new Date().toLocaleString()}] - ${message}`
    console.log(newLine)
    fs.appendFile(path.join(__dirname, 'log.txt'), newLine, (err) => {
        if (err) throw err
    })
}