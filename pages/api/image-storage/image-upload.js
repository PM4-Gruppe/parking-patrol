import express from 'express';
import multer from 'multer'; // used for file uploads
import { join } from 'path';
import { rename } from 'fs';

const app = express();
const upload = multer({ dest: 'uploads/' }); // set the directory for uploaded files

// handle POST requests to /api/save-image
app.post('/api/save-image', upload.single('image'), (req, res) => {
  const { file } = req;

  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // move the uploaded file to the /storage directory
  const targetPath = join(__dirname, 'storage', file.originalname);

  rename(file.path, targetPath, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error saving file' });
    }

    res.status(200).json({ message: 'File saved successfully' });
  });
});

// start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});