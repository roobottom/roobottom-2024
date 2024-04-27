const sharp = require('sharp');
const NodeCache = require('node-cache');
const path = require('path');
const cache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

const parentDirectory = path.join(process.cwd(), 'src/assets/images');

module.exports = async (req, res, next) => {
    const filePath = path.join(parentDirectory, req.path);
    const transformPattern = req.query.tr;

    let format = path.extname(filePath).replace('.', '') || 'jpeg';
    // Override if a format query parameter is provided
    if (req.query.format) {
        format = req.query.format;
    }

    let contentType = 'image/jpeg';  // Default content type
    switch (format) {
        case 'png':
            contentType = 'image/png';
            break;
        case 'webp':
            contentType = 'image/webp';
            break;
        case 'jpeg':
        case 'jpg':
            contentType = 'image/jpeg';
            break;
        case 'gif':
            contentType = 'image/gif';
            break;
        case 'tiff':
            contentType = 'image/tiff';
            break;
        // Add other formats as necessary
    }

    // Generate a cache key based on the file path and transformation pattern
    const cacheKey = `${filePath}-${transformPattern}`;

    // Check cache first
    let imgData = cache.get(cacheKey);
    if (imgData) {
        res.contentType(contentType);
        return res.send(imgData);
    }

    // Transform image if not in cache
    try {
        let transformer = sharp(filePath);

        Object.keys(req.query).forEach(key => {
            const value = req.query[key];
            switch (key) {
                case 'resize':
                    const [width, height] = value.split(',').map(Number);
                    transformer = transformer.resize(width || undefined, height || undefined);
                    break;
                case 'sharpen':
                    transformer = transformer.sharpen();
                    break;
                case 'blur':
                    if (value) {
                        transformer = transformer.blur(parseFloat(value));
                    } else {
                        transformer = transformer.blur();
                    }
                    break;
                case 'format':
                    transformer = transformer.toFormat(value);
                    break;
                case 'quality':
                    transformer = transformer.jpeg({ quality: parseInt(value) });
                    break;
                case 'greyscale':
                    if (value === 'true') transformer = transformer.greyscale();
                    break;
                // You can extend this with more cases as needed.
            }
        });

        imgData = await transformer.toBuffer();
        cache.set(cacheKey, imgData);  // Cache the transformed image
        res.contentType(contentType);
        res.send(imgData);
    } catch (error) {
        console.error('Error processing image:', error);
        res.status(500).send('Error processing image');
    }
    next();
}