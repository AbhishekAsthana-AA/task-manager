import React, { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import { Card, Button } from 'react-bootstrap';

export default React.memo(function TaskItem({ task }) {
  const { toggleComplete, deleteTask } = useContext(TaskContext);

  return (
    <Card className="mb-2">
      <Card.Body className="d-flex justify-content-between align-items-center">
        <div onClick={() => toggleComplete(task.id)} style={{ cursor: 'pointer' }}>
          <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
            {task.text}
          </span>
        </div>
        <Button variant="danger" size="sm" onClick={() => deleteTask(task.id)}>Delete</Button>
      </Card.Body>
    </Card>
  );
});