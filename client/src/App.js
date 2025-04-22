// src/App.js
import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { taskService } from './services/api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Charger les tâches depuis l'API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await taskService.getAllTasks();
        setTasks(data);
        setLoading(false);
      } catch (err) {
        console.error('Erreur de chargement initial :', err);
        setError(err);
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Ajouter une nouvelle tâche au state local
  const handleTaskAdded = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>📝 Gestionnaire de tâches</h1>

      <TaskForm onTaskAdded={handleTaskAdded} />

      {loading && <p>Chargement des tâches...</p>}
      {error && <p style={{ color: 'red' }}>Erreur : {error.message}</p>}
      {!loading && !error && <TaskList tasks={tasks} />}
    </div>
  );
}

export default App;
