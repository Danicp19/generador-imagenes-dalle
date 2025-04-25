document.getElementById('formulario').addEventListener('submit', async e => {
    e.preventDefault();
    const prompt = document.getElementById('prompt').value;
  
    const res = await fetch('/generar-imagen', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });
  
    const data = await res.json();
    if (data.imagen) {
      const img = document.getElementById('imagen');
      img.src = data.imagen;
      img.style.display = 'block';
    }
  });
  