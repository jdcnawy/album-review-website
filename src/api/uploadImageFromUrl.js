const axios = require('axios');

module.exports = async (req, res) => {
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

    console.log('File sent to the client for download');
  } catch (error) {
    console.error('Error downloading or uploading image:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
