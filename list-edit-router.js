const express = require('express');
const router = express.Router();

const tarea = [
  {
    "id": 1,
    "description": "dormir",
    "isCompleted": false
  },
  {
    "id": 2,
    "description": "hacer tramites bancarios",
    "isCompleted": true
  },
  {
    "id": 3,
    "description": "ir al supermercado",
    "isCompleted": false
  }
];

function bodyValidation(req, res, next) {
  const { description, isCompleted } = req.body;

  if (!description || typeof isCompleted !== 'boolean') {
    res.status(400).send('Invalid request body');
  } else {
    next();
  }
}

router.use(bodyValidation);

router.get('/', (req, res) => {
  res.json(tarea);
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const tareaEncontrada = tarea.find(item => item.id === id);
  if (tareaEncontrada) {
    res.json(tareaEncontrada);
  } else {
    res.status(404).json({ message: 'Tarea no encontrada' });
  }
});

router.post('/', (req, res) => {
  const nuevaTarea = req.body;
  tarea.push(nuevaTarea);
  res.status(201).json(nuevaTarea);
});

router.delete('/:id', (req, res) => {
  const tareaId = parseInt(req.params.id);
  const tareaIndex = tarea.findIndex(item => item.id === tareaId);

  if (tareaIndex !== -1) {
    const tareaEliminada = tarea.splice(tareaIndex, 1);
    res.json(tareaEliminada[0]);
  } else {
    res.status(404).json({ message: 'Tarea no encontrada' });
  }
});

router.put('/:id', (req, res) => {
  const tareaId = parseInt(req.params.id);
  const tareaActualizada = req.body;

  const tareaIndex = tarea.findIndex(item => item.id === tareaId);

  if (tareaIndex !== -1) {
    tarea[tareaIndex] = { ...tarea[tareaIndex], ...tareaActualizada };
    res.json(tarea[tareaIndex]);
  } else {
    res.status(404).json({ message: 'Tarea no encontrada' });
  }
});

module.exports = router;
