const axios = require('axios');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).end('Método no permitido');
  }

  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt no recibido' });
  }

  try {
    const response = await axios.post('https://api.openai.com/v1/images/generations', {
      model: "dall-e-3",
      prompt,
      n: 1,
      size: "1024x1024"
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const url = response.data.data[0].url;
    res.status(200).json({ imagen: url });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Error al generar la imagen.' });
  }
};
