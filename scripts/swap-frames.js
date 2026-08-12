import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const srcDir = path.join(__dirname, '../public/frames_opt')
const destDir = path.join(__dirname, '../public/frames')

if (fs.existsSync(srcDir)) {
  const files = fs.readdirSync(srcDir)
  let count = 0
  for (const file of files) {
    const srcFile = path.join(srcDir, file)
    const destFile = path.join(destDir, file)
    fs.copyFileSync(srcFile, destFile)
    fs.unlinkSync(srcFile)
    count++
  }
  fs.rmdirSync(srcDir)
  console.log(`Successfully replaced ${count} frame files with optimized 4.88 MB images!`)
} else {
  console.log(`srcDir ${srcDir} does not exist.`)
}
