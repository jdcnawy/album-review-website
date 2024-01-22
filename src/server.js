const express = require('express');
const app = express();

// Routes
app.use('/api/getAccessToken', require('./api/getAccessToken'));
app.use('/api/downloadImage', require('./api/downloadImage'));
app.use('/api/uploadImageFromUrl', require('./api/uploadImageFromUrl'));
app.use('/api/getAlbumInfo', require('./api/getAlbumInfo'));

// Rest of your server setup

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
