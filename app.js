const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
    }
});

const upload = multer({ storage: storage });

// Serve the upload form
app.get('/', (req, res) => {
    res.send(`
        <form ref='uploadForm' 
            id='uploadForm' 
            action='/upload' 
            method='post' 
            encType="multipart/form-data">
              <input type="file" name="file" />
              <input type='submit' value='Upload!' />
        </form>
    `);
});

// Handle file upload
app.post('/upload', upload.single('file'), (req, res) => {
    res.send(`File uploaded successfully: ${req.file.filename}`);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});