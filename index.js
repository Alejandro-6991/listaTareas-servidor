const express = require('express');

const app = express();

//informacion de la lista contacto
//const lista = require('./lista.json')

//aqui definimos cuerpo
const port = 3008

//lista
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

app.use(express.json());
// la ruta 

app.get('/tareas', (req,res)=>{
res.json(tareas);

})



app.listen(port,()=>{
    console.log('Servidor Corriendo'+port)
})