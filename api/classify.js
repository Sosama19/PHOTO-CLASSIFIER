const vision = require('@google-cloud/vision');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Creates a client
const client = new vision.ImageAnnotatorClient();

// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join('/tmp/uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage }).single('photo');

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ error: 'Failed to upload file' });
            }
            if (!req.file) {
                return res.status(400).json({ error: 'No file uploaded' });
            }

            const filePath = path.join('/tmp/uploads', req.file.filename);
            const fileUrl = `/uploads/${req.file.filename}`;

            try {
                const [result] = await client.labelDetection(filePath);
                const labels = result.labelAnnotations;

                // Log the API response to understand its structure
                console.log('API Response:', JSON.stringify(result, null, 2));

                const categories = labels.map(label => label.description).join(', ');

                res.status(200).json({ fileUrl, category: categories });
            } catch (error) {
                console.error('Error classifying image:', error);
                res.status(500).json({ error: 'Failed to classify image' });
            }
        });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};
