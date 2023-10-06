const express = require('express');
const editRouter = require('./list-edit-router');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const app = express();

dotenv.config(); 

app.use(express.json());
app.use('/list', editRouter);
app.use('/list-edit-router', editRouter);

const port = 3008;

const tareas = [
  {
    "id": 1,
    "description": "Hacer la tarea de Fisica",
    "isCompleted": false
  },
  {
    "id": 2,
    "description": "Lavar los platos",
    "isCompleted": true
  },
  {
    "id": 3,
    "description": "Estudiar para el examen",
    "isCompleted": false
  }
];

function methods(req, res, next) {
  const method = req.method;
  if (method === 'GET' || method === 'POST' || method === 'PUT') {
    next();
  } else {
    res.status(405).send('Invalid http request');
  }
}

app.use('/tareas', methods);

app.get('/tareas', (req, res) => {
  res.json(tareas);
});

app.get('/tareas/completado', (req, res) => {
  const completadoTareas = tareas.filter(tarea => tarea.isCompleted);
  res.json(completadoTareas);
});

app.get('/tareas/incompleto', (req, res) => {
  const tareasIncompletas = tareas.filter(tarea => !tarea.isCompleted);
  res.json(tareasIncompletas);
});

// Ruta de autenticación
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Verifica las credenciales 
  if (username === 'usuario1' && password === 'contraseña1') {
    const payload = { username: 'usuario1' };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } else {
    res.status(401).json({ message: 'Credenciales incorrectas' });
  }
});

// Ruta protegida
app.get('/ruta-protegida', (req, res) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token no válido' });
    }

    // Token es válido,
    res.json({ message: 'Acceso concedido' });
  });
});


app.listen(port, () => {
  console.log(`Servidor Express corriendo en el puerto ${port}`);
});
