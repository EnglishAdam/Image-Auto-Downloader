// Required modules
const https = require('https')
const fs = require('fs');
const { Console } = require('console');

/**
 * Saves a file at a url to a set path, must ensure folder exists before hand
 * @param {*} path Path to save file to
 * @param {*} url Url to fetch image from
 */
function saveFile(path, url) {
  // Create and reference stream
  const file = fs.createWriteStream(path);

  // Fetch the resource at the end of the url
  https.get(url, ({ headers }) => {
    if (headers.location) {
      // If the url returns a resource location (Such as with picsum or unsplashed)
      // Thenr request the resource at their location
      https.get(headers.location, (res) => {
        // Store into the file
        res.pipe(file);
      }).on('error', (e) => console.error(e))
    } else {
      // Else, if the url is directly to the resouce
      // Store into the file
      res.pipe(file);
    }
  }).on('error', (e) => console.error(e))
}

// Number of images
const count = 100 

// For each count fetches small and large image from picsum and stores it
for (let index = 0; index < count; index++) {
  console.log('Fetching files --', index)
  saveFile(`512x512/${index}.jpg`, 'https://picsum.photos/512/512')
  saveFile(`1280x720/${index}.jpg`, 'https://picsum.photos/1280/720')
}
console.log('Complete')
