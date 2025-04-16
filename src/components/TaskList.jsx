import React, { useContext, useState, useMemo } from 'react';
import { Accordion, Card, Button, ButtonGroup } from 'react-bootstrap';
import { TaskContext } from '../context/TaskContext';
import TaskItem from './TaskItem';

export default function TaskList() {
  const { tasks, setTasks } = useContext(TaskContext);
  const [filter, setFilter] = useState('all');

  const filteredTasks = useMemo(() => {
    if (filter === 'completed') return tasks.filter(t => t.completed);
    if (filter === 'pending') return tasks.filter(t => !t.completed);
    return tasks;
  }, [filter, tasks]);

  const groupedTasks = useMemo(() => {
    return {
      all: filteredTasks,
      completed: filteredTasks.filter(t => t.completed),
      pending: filteredTasks.filter(t => !t.completed),
    };
  }, [filteredTasks]);

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData("taskId", taskId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, dropIndex, sectionTasks, targetSection) => {
    e.preventDefault();
  
    const taskId = e.dataTransfer.getData("taskId");
  
    const draggedTaskIndex = tasks.findIndex(t => t.id === taskId);
    console.log(draggedTaskIndex)
    if (draggedTaskIndex === -1) return;
  
    const draggedTask = { ...tasks[draggedTaskIndex] }; 
  
    if (targetSection === 'completed') {
      draggedTask.completed = true;
    } else if (targetSection === 'pending') {
      draggedTask.completed = false;
    }
  
    let newTasks = tasks.filter(t => t.id !== taskId);
    const updatedSection = [...sectionTasks];
    updatedSection.splice(dropIndex, 0, draggedTask);

    const sectionIndexes = updatedSection.map(t => t.id);
    newTasks = newTasks.filter(t => !sectionIndexes.includes(t.id));
    const finalTasks = [...newTasks, ...updatedSection];
  
    setTasks(finalTasks);
  };
  


  const renderTasks = (sectionTasks, sectionName) => (
    <div>
      {sectionTasks.map((task, index) => (
        <div
          key={task.id}
          draggable
          onDragStart={(e) => handleDragStart(e, task.id)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, index, sectionTasks, sectionName)}
          style={{
            margin: "10px 0",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            cursor: "move",
            backgroundColor: "#fff",
          }}
        >
          <TaskItem task={task} />
        </div>
      ))}
    </div>
  );
  
  
  return (
    <>
      <ButtonGroup className="mb-3">
        <Button variant="outline-primary" onClick={() => setFilter('all')}>All</Button>
        <Button variant="outline-success" onClick={() => setFilter('completed')}>Completed</Button>
        <Button variant="outline-warning" onClick={() => setFilter('pending')}>Pending</Button>
      </ButtonGroup>
  
      <Accordion defaultActiveKey={['0', '1', '2']} alwaysOpen>
        <div className="mb-3">
          <Accordion.Item eventKey="0">
            <Accordion.Header>All Tasks</Accordion.Header>
            <Accordion.Body style={{ backgroundColor: '#f0f8ff' }}>
            {renderTasks(groupedTasks.all, 'all')}
            </Accordion.Body>
          </Accordion.Item>
        </div>
  
        <div className="mb-3">
          <Accordion.Item eventKey="1">
            <Accordion.Header>Completed Tasks</Accordion.Header>
            <Accordion.Body style={{ backgroundColor: '#e6ffed' }}>
            {renderTasks(groupedTasks.completed, 'completed')}
            </Accordion.Body>
          </Accordion.Item>
        </div>
  
        <div className="mb-3">
          <Accordion.Item eventKey="2">
            <Accordion.Header>Pending Tasks</Accordion.Header>
            <Accordion.Body style={{ backgroundColor: '#fff8e6' }}>
            {renderTasks(groupedTasks.pending, 'pending')}
            </Accordion.Body>
          </Accordion.Item>
        </div>
      </Accordion>
    </>
  );
  
  
}
