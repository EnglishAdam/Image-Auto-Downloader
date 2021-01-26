const https = require('https')
const fs = require('fs')

function saveFile(path, url) {
  const file = fs.createWriteStream(path);
  https.get(url, ({ headers }) => {
    https.get(headers.location, (res) => {
      res.pipe(file);
    }).on('error', (e) => console.error(e))
  })
}

const number = 10
const sizes = [
  [512, 512], // Small image
  [1280, 720]
]

for (let index = 0; index < number; index++) {
  saveFile(`512x512/${index}.jpg`, 'https://picsum.photos/512/512')
  saveFile(`1280x720/${index}.jpg`, 'https://picsum.photos/1280/720')
}

