const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

const inputPath = path.join(__dirname, 'src', 'assets', 'images', 'logo.png')

async function compressLogo() {
  if (!fs.existsSync(inputPath)) {
    console.error('logo.png not found:', inputPath)
    process.exit(1)
  }

  await sharp(inputPath)
    .resize(192, 192, {
      fit: 'cover',
      position: 'center'
    })
    .png({ quality: 90, compressionLevel: 9 })
    .toBuffer()
    .then(buf => {
      fs.writeFileSync(inputPath, buf)
    })

  const output = await sharp(inputPath).metadata()
  const stat = fs.statSync(inputPath)
  console.log(
    `logo compressed: ${output.width}x${output.height}, ${(
      stat.size / 1024
    ).toFixed(2)}KB`
  )
}

compressLogo().catch(err => {
  console.error('compress failed:', err.message)
  process.exit(1)
})
