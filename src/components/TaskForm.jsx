import React, { useContext, useState } from 'react';
import { TaskContext } from '../context/TaskContext';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

export default function TaskForm() {
  const [text, setText] = useState('');
  const [status, setStatus] = useState('pending');
  const { addTask } = useContext(TaskContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    addTask({ id: uuidv4(), text, completed: status === 'completed' });
    setText('');
    setStatus('pending');
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-3">
      <Row className="g-2">
        <Col xs={6} sm={7}>
          <Form.Control
            type="text"
            placeholder="Add a task"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </Col>
        <Col xs={3} sm={3}>
          <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </Form.Select>
        </Col>
        <Col xs={3} sm={2}>
          <Button type="submit" className="w-100">Add</Button>
        </Col>
      </Row>
    </Form>
  );
}