import React, { useContext, useState } from 'react';
import { TaskProvider, TaskContext } from './context/TaskContext';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { Navbar,Container, Button } from "react-bootstrap";

export default function App() {
  return (
    <TaskProvider>
      <Container className="py-2">
        <ThemeToggle />
      
        <TaskForm />
        <TaskList />
      </Container>
    </TaskProvider>
  );
}

function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.className = darkMode ? '' : 'bg-dark text-light';
  };

  return (
    <Navbar bg={darkMode ? 'dark' : 'light'} variant={darkMode ? 'dark' : 'light'} className="mb-4 shadow-sm">
      <Container className="d-flex justify-content-between">
        <Navbar.Brand className="fs-3 fw-bold">📝 Task Manager</Navbar.Brand>
        <Button onClick={toggleTheme} variant="outline-secondary">
          Toggle Theme
        </Button>
      </Container>
    </Navbar>
  );
}