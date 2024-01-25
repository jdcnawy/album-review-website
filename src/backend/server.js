const express = require('express');
const cors = require('cors');
const axios = require('axios');
const qs = require('qs');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Define getAccessToken function

const getAccessToken = async () => {
  try {
    const clientId = 'bf951b6a6d6e43c09cb0e317859a652c';
    const clientSecret = '4577889fe42846cd9cab3d8f0c520a6e';
    const authString = `${clientId}:${clientSecret}`;
    const base64AuthString = Buffer.from(authString).toString('base64');
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${base64AuthString}`,
    };
    const data = {
      grant_type: 'client_credentials',
    };
    const response = await axios.post('https://accounts.spotify.com/api/token', qs.stringify(data), { headers });
    const token = response.data.access_token;
    console.log('Access Token:', token);
    return token;
  } catch (error) {
    console.error('Error fetching or refreshing access token:', error.response ? error.response.data : error.message);
    throw error;
  }
};

app.get('/downloadImage', async (req, res) => {
  try {
    const imageUrl = req.query.imageUrl;
    console.log('Received imageUrl:', imageUrl);

    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });

    // Set headers for the file download
    res.setHeader('Content-Disposition', 'attachment; filename="temp_image.jpg"');
    res.setHeader('Content-Type', 'image/jpeg');

    // Send the image data directly
    res.send(Buffer.from(response.data));
  } catch (error) {
    console.error('Error downloading or uploading image:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Serve the downloaded image
app.get('/download/:fileName', (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(__dirname, 'temp', fileName);

  console.log('Requested file:', filePath);

  // Check if the file exists before serving
  if (fs.existsSync(filePath)) {
    console.log('File exists, serving...');

    // Set headers for the file download
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    res.setHeader('Content-Type', 'image/jpeg'); // Update the content type based on your image type

    // Stream the file data to the response
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } else {
    console.log('File does not exist.');
    // If the file does not exist, send a 404 response
    res.status(404).send('Not Found');
  }
});
// Endpoint to download the image from URL temporarily
app.post('/uploadImageFromUrl', async (req, res) => {
  try {
    console.log('Request received');
    const imageUrl = req.body.imageUrl; // Get the image URL from the request body
    console.log('Image URL:', imageUrl);

    const response = await axios.get(imageUrl, { responseType: 'stream' }); // Use 'stream' responseType

    // Set headers for the file download
    const fileName = 'temp_image.jpg'; // You can set a dynamic file name based on your needs
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    res.setHeader('Content-Type', 'image/jpeg'); // Update the content type based on your image type

    // Stream the image data to the response
    response.data.pipe(res);

    console.log('File sent to client for download');
  } catch (error) {
    console.error('Error downloading or uploading image:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Get access token endpoint
app.post('/getAccessToken', async (req, res) => {
  try {
    const token = await getAccessToken();
    res.json({ accessToken: token });
  } catch (error) {
    console.error('Error fetching or refreshing access token:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get album info endpoint
app.get('/getAlbumInfo/:albumId', async (req, res) => {
  try {
    const albumId = req.params.albumId;
    console.log('Received albumId:', albumId);
    const spotifyApiUrl = `https://api.spotify.com/v1/albums/${albumId}`;
    const accessToken = await getAccessToken();

    const headers = {
      'Authorization': `Bearer ${accessToken}`,
    };

    const response = await axios.get(spotifyApiUrl, { headers });
    const albumInfo = response.data;

    res.json(albumInfo);
  } catch (error) {
    console.error('Error fetching album info:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
