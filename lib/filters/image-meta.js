const sharp = require('sharp');
const path = require('path');

module.exports = async function(localPath, type) {
  try {
      const abs = path.join(process.cwd(), 'src/assets', localPath);
      const meta = await sharp(abs).rotate().metadata();

      if (type === 'width') return meta.width;
      if (type === 'height') return meta.height;
      if (type === 'format') return meta.format;
      if (type === 'orientation') {
        if (meta.width * 1.2 > meta.height) return 'wide';
        if (meta.height * 1.2 > meta.width) return 'tall';
        return 'square';
      }
      return meta;
  } catch (error) {
    return error;
  }
}