import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const framesDir = path.join(__dirname, '../public/frames')
const outDir = path.join(__dirname, '../public/frames_opt')

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true })
}

async function processFrames() {
  const files = fs.readdirSync(framesDir).filter((f) => f.endsWith('.webp'))
  console.log(`Found ${files.length} webp frames in ${framesDir}`)

  const samplePath = path.join(framesDir, files[0])
  const meta = await sharp(samplePath).metadata()
  console.log(`Original resolution: ${meta.width}x${meta.height}`)

  let initialTotal = 0
  let newTotal = 0

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const filePath = path.join(framesDir, file)
    const outPath = path.join(outDir, file)
    const inputBuffer = fs.readFileSync(filePath)
    initialTotal += inputBuffer.length

    // Resize to crisp 1440w (ideal for retina 2K displays & mobile) while retaining 100% sharp detail
    // WebP quality: 78, effort: 6, smartSubsampling: true
    const outputBuffer = await sharp(inputBuffer)
      .resize({ width: 1440, withoutEnlargement: true })
      .webp({ quality: 78, effort: 6, smartSubsampling: true })
      .toBuffer()

    fs.writeFileSync(outPath, outputBuffer)
    newTotal += outputBuffer.length

    if ((i + 1) % 20 === 0 || i === files.length - 1) {
      console.log(`Processed ${i + 1}/${files.length} frames...`)
    }
  }

  const origMB = (initialTotal / (1024 * 1024)).toFixed(2)
  const newMB = (newTotal / (1024 * 1024)).toFixed(2)
  const savedPercent = (((initialTotal - newTotal) / initialTotal) * 100).toFixed(1)

  console.log(`--- Optimization Results ---`)
  console.log(`Original Total Size: ${origMB} MB`)
  console.log(`New Total Size: ${newMB} MB`)
  console.log(`Total Size Saved: ${savedPercent}% reduction!`)
}

processFrames().catch((err) => {
  console.error('Error optimizing frames:', err)
})
