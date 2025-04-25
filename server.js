// server.js
const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());
app.use(express.static('public')); // Para servir archivos estáticos (html, css, js)

// Ruta para generar la imagen
app.post('/generar-imagen', async (req, res) => {
  const prompt = req.body.prompt;

  try {
    const response = await axios.post('https://api.openai.com/v1/images/generations', {
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024"
    }, {
      headers: {
        'Authorization': `Bearer TU_API_KEY`,
        'Content-Type': 'application/json'
      }
    });

    res.json({ imagen: response.data.data[0].url });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al generar la imagen.');
  }
});

// Puerto donde se va a correr el servidor (Vercel usa 3000 de forma predeterminada)
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Servidor corriendo en puerto ${port}`));
