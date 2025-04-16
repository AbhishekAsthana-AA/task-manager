import React, { createContext, useCallback, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

export const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useLocalStorage('tasks', []);

  const addTask = useCallback((task) => {
    setTasks(prev => [...prev, task]);
  }, [setTasks]);

  const deleteTask = useCallback((id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }, [setTasks]);

  const toggleComplete = useCallback((id) => {
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  }, [setTasks]);

  const value = useMemo(() => ({ tasks, addTask, setTasks, deleteTask, toggleComplete }), [tasks]);

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
}