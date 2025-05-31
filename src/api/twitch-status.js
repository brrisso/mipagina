const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const clientId = 'TU_CLIENT_ID';
  const accessToken = 'TU_ACCESS_TOKEN';
  const username = 'TU_NOMBRE_DE_USUARIO';

  try {
    const response = await fetch(`https://api.twitch.tv/helix/streams?user_login=${pepethereal}`, {
      headers: {
        'Client-ID': clientId,
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();
    const isLive = data.data && data.data.length > 0;

    res.status(200).json({ isLive });
  } catch (error) {
    console.error('Error fetching Twitch status:', error);
    res.status(500).json({ error: 'Error fetching Twitch status' });
  }
};
