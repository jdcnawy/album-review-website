const axios = require('axios');

module.exports = async (req, res) => {
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
};
