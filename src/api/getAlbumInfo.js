const axios = require('axios');

module.exports = async (req, res) => {
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
};
