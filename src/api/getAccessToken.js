const axios = require('axios');
const qs = require('qs')

module.exports = async (req, res) => {
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
    res.json({ accessToken: token });
  } catch (error) {
    console.error('Error fetching or refreshing access token:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
