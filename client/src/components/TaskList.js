// src/components/TaskList.js
import React from 'react';

const TaskList = ({ tasks }) => {
  if (tasks.length === 0) {
    return <p>Aucune tâche pour le moment.</p>;
  }

  return (
    <div>
      <h2>Liste des tâches</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id} style={{ marginBottom: '8px' }}>
            {task.title} {task.completed ? '✅' : '❌'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
