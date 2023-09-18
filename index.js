const express = require('express');
const editRouter = require('./list-edit-router'); 

const app = express();

app.use(express.json());
app.use('/list', editRouter); 
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

app.listen(port, () => {
  console.log(`Servidor Express corriendo en el puerto ${port}`);
});

