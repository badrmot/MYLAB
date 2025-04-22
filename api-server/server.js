// server.js - Configuration de base + routes API
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Message de base
app.get('/', (req, res) => {
  res.json({ message: "API opérationnelle" });
});

// 💾 Données simulées
let tasks = [
  { id: 1, title: 'Apprendre Express', completed: false },
  { id: 2, title: 'Créer une API REST', completed: false }
];

// 🔹 GET - Toutes les tâches
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// 🔹 GET - Une tâche par ID
app.get('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: 'Tâche non trouvée' });
  res.json(task);
});

// 🔹 POST - Créer une tâche
app.post('/api/tasks', (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    completed: false
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});
// 🔁 PUT - Mettre à jour une tâche
app.put('/api/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(t => t.id === id);
  
    if (!task) {
      return res.status(404).json({ error: 'Tâche non trouvée' });
    }
  
    // Mise à jour des champs
    task.title = req.body.title !== undefined ? req.body.title : task.title;
    task.completed = req.body.completed !== undefined ? req.body.completed : task.completed;
  
    res.json(task);
  });
  
  // ❌ DELETE - Supprimer une tâche
  app.delete('/api/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = tasks.findIndex(t => t.id === id);
  
    if (index === -1) {
      return res.status(404).json({ error: 'Tâche non trouvée' });
    }
  
    tasks.splice(index, 1);
    res.json({ message: `Tâche ${id} supprimée` });
  });
  

// 🔚 Lancement du serveur
app.listen(PORT, () => {
  console.log(`✅ Serveur en écoute sur le port ${PORT}`);
});
