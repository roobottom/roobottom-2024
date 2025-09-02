// image-metadata.js
const sharp = require('sharp');
const path = require('path');

const parentDirectory = path.join(process.cwd(), 'src/assets/images');

module.exports = async (req, res, next) => {
  try {
    const filePath = path.join(parentDirectory, req.path);   
    const meta = await sharp(filePath).rotate().metadata();
    res.json({ width: meta.width, height: meta.height, format: meta.format || null });
    next();
  } catch {
    res.status(404).json({ error: 'Metadata: Image not found' });
    return;
  }
};
