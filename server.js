const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// Ruta para generar la imagen
app.post('/generar-imagen', async (req, res) => {
  const prompt = req.body.prompt;
  console.log('Prompt recibido:', prompt);

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt no recibido' });
  }

  try {
    const response = await axios.post('https://api.openai.com/v1/images/generations', {
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024"
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    res.json({ imagen: response.data.data[0].url });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).send('Error al generar la imagen.');
  }
});

// Configuración del puerto
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Servidor corriendo en puerto ${port}`));

