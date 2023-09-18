const express = require('express');

const router = express.Router();


router.get('/', (req,res) => {
  res.send('ruta raiz (get)')
} )

router.get('/:id', (req,res) => {
  const id = req.params.id;
  res.send('ruta para obtener un list:'+id)
} )


// crear tarea
router.post('/:id', (req, res) => {
  const nuevaTarea = req.body; 
  tareas.push(nuevaTarea);
  res.status(201).json(nuevaTarea);
});

// eleminar tarea
router.delete('/:id', (req, res) => {
  const tareaId = parseInt(req.params.id);
  const tareaIndex = tareas.findIndex(tarea => tarea.id === tareaId);

  if (tareaIndex !== -1) {
    const tareaEliminada = tareas.splice(tareaIndex, 1);
    res.json(tareaEliminada[0]);
  } else {
    res.status(404).json({ message: 'Tarea no encontrada' });
  }
});

// actualizar tarea
router.put('/tareas/:id', (req, res) => {
  const tareaId = parseInt(req.params.id);
  const tareaActualizada = req.body; 

  const tareaIndex = tareas.findIndex(tarea => tarea.id === tareaId);

  if (tareaIndex !== -1) {
    tareas[tareaIndex] = { ...tareas[tareaIndex], ...tareaActualizada };
    res.json(tareas[tareaIndex]);
  } else {
    res.status(404).json({ message: 'Tarea no encontrada' });
  }
});



module.exports = router;
