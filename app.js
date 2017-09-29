const fs = require('fs');
const Parallel = require('paralleljs');
const sharp = require('sharp');
const resizeSizes = [24, 36, 48, 72, 96];
const imgFileName = 'pushicon.png';
const dirs = ['dist', 'dist/drawable-hdpi', 'dist/drawable-mdpi', 'dist/drawable-xhdpi', 'dist/drawable-xxhdpi', 'dist/drawable-xxxhdpi'];
const imageSrc = fs.readFileSync(imgFileName);

if (!imageSrc) return console.error('이미지를 읽는데 실패했습니다: ', err);

let promises = [];

dirs.forEach((dir) => {
  try {
    fs.mkdirSync(dir);
  } catch(err) {
  }
})

resizeSizes.forEach((size) => {
  promises.push(resize(size));
});

Promise.all(promises)
  .then((data) => {
    console.log(data);
  })
  .catch((err)=>{
    console.error('에러가 발생했습니다.', err);
  })

function resize(width) {
  let imgDir = 'dist/';
  switch(width) {
    case 24:
      imgDir += 'drawable-mdpi/'
      break;
    case 36:
      imgDir += 'drawable-hdpi/'
      break;
    case 48:
      imgDir += 'drawable-xhdpi/'
      break;
    case 72:
      imgDir += 'drawable-xxhdpi/'
      break;
    case 96:
      imgDir += 'drawable-xxxhdpi/'
      break;
    default: 
      return console.assert(false, '주어진 사이즈만 가능합니다. :', width);
  }
  return sharp(imageSrc)
    .resize(width)
    .toFile(imgDir + imgFileName);
}