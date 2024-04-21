/*
* pass an image dictionary [{url,alt},...] and this filter will return a imgkit url for an up-to 4 image collage

images: [{url, alt}, ...] (The image array)
w: int, default: 414 (The width in pixels of the final image)
h: int, default: 276 (The height in pixels of the final image)
max: int, deafult: 4 (The number of images to render from the image array, Max 4)
*/

module.exports = function (images, w = 414, h = 276, max = 4, gap = 2, server = process.env.IMG_SERVER) {
  const background = `/assets/images/collage-background.png?tr=w-${w},h-${h},fo-face`;

  if (images.length === 1) {
    return server + images[0].url + `?tr=w-${w},h-${h}`;
  }

  const totalImages = Math.min(images.length, max > 4 ? 4 : max);
  images = images.slice(0, totalImages);

  let transformation = '';
  if (totalImages === 4) {
    const halfWidth = Math.floor((w - gap) / 2);
    const halfHeight = Math.floor((h - gap) / 2);
    transformation += generateImageLayer(images, halfWidth, halfHeight, [0, 0], 0);
    transformation += generateImageLayer(images, halfWidth, halfHeight, [halfWidth + gap, 0], 1);
    transformation += generateImageLayer(images, halfWidth, halfHeight, [0, halfHeight + gap], 2);
    transformation += generateImageLayer(images, halfWidth, halfHeight, [halfWidth + gap, halfHeight + gap], 3);
  }
  else if (totalImages === 3) {
    const halfWidth = Math.floor((w - gap) / 2);
    const halfHeight = Math.floor((h - gap) / 2);
    transformation += generateImageLayer(images, halfWidth, h, [0, 0], 0);
    transformation += generateImageLayer(images, halfWidth, halfHeight, [halfWidth + gap, 0], 1);
    transformation += generateImageLayer(images, halfWidth, halfHeight, [halfWidth + gap, halfHeight + gap], 2);
  }
  else if (totalImages === 2) {
    const halfHeight = Math.floor((h - gap) / 2);
    transformation += generateImageLayer(images, w, halfHeight, [0, 0], 0);
    transformation += generateImageLayer(images, w, halfHeight, [0, halfHeight + gap], 1);
  }

  return server + background + transformation;
}

function generateImageLayer(images, width, height, [lx, ly], index) {
  return `:l-image,i-${images[index].url},w-${width},h-${height},lx-${lx},ly-${ly},l-end`;
}

