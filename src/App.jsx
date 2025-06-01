import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

  const fetchTodos = async () => {
    const res = await axios.get('https://todo-backend-qkks.onrender.com/todos');
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (title.trim() === '') return;
    await axios.post('https://todo-backend-qkks.onrender.com/todos', { title });
    setTitle('');
    fetchTodos();
  };

  const deleteTodo = async (DelId) => {
    await axios.delete(`https://todo-backend-qkks.onrender.com/todos/${DelId}`);
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div
      style={{
        maxWidth: '500px',
        margin: '20px auto',
        padding: '20px',
        backgroundColor: '#1a1a1a', // Dark charcoal background
        minHeight: '100vh',
        color: '#d9d9d9', // Light gray text for contrast
        fontFamily: "'Montserrat', sans-serif", // Bold, modern font
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between', // Pushes content to top and bottom
      }}
    >
      {/* Top section: Title and Input */}
      <div>
        <h1
          style={{
            fontSize: '3rem',
            fontWeight: '700',
            color: '#ffffff',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            marginBottom: '40px',
            borderBottom: '3px solid #4a4a4a',
            paddingBottom: '15px',
            textAlign: 'center',
          }}
        >
          To-Do List
        </h1>
        <div
          style={{
            display: 'flex',
            gap: '15px',
            marginBottom: '30px',
            justifyContent: 'center',
          }}
        >
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Yangi vazifa"
            style={{
              flex: '1',
              padding: '14px',
              fontSize: '1.1rem',
              backgroundColor: '#2d2d2d',
              border: '1px solid #4a4a4a',
              borderRadius: '4px',
              color: '#d9d9d9',
              outline: 'none',
              transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
              maxWidth: '300px',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#6b7280';
              e.target.style.boxShadow = '0 0 5px rgba(107, 114, 128, 0.3)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#4a4a4a';
              e.target.style.boxShadow = 'none';
            }}
          />
          <button
            onClick={addTodo}
            style={{
              padding: '14px 25px',
              fontSize: '1.1rem',
              fontWeight: '600',
              backgroundColor: '#3b82f6',
              color: '#ffffff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              transition: 'background-color 0.3s ease, transform 0.2s ease',
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#2563eb';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#3b82f6';
              e.target.style.transform = 'scale(1)';
            }}
          >
            Qo‘shish
          </button>
        </div>
      </div>

      {/* Bottom section: Todo List in a styled div */}
      <div
        style={{
          backgroundColor: '#262626', // Slightly lighter dark for contrast
          borderRadius: '8px',
          padding: '20px',
          border: '1px solid #4a4a4a',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)', // Strong shadow for depth
          marginTop: 'auto', // Pushes this div to the bottom
        }}
      >
        <ul
          style={{
            listStyle: 'none',
            padding: '0',
          }}
        >
          {todos.map((todo) => (
            <li
              key={todo.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '15px',
                marginBottom: '15px',
                backgroundColor: '#2d2d2d', // Slightly darker for list items
                borderRadius: '4px',
                border: '1px solid #4a4a4a',
                boxShadow: '0 3px 8px rgba(0, 0, 0, 0.4)',
                transition: 'transform 0.2s ease, background-color 0.3s ease',
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'scale(1.02)';
                e.target.style.backgroundColor = '#2f2f2f';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.backgroundColor = '#2d2d2d';
              }}
            >
              <span
                style={{
                  fontSize: '1.2rem',
                  fontWeight: '500',
                  color: '#d9d9d9',
                }}
              >
                {todo.title}
              </span>
              <button
                onClick={() => {deleteTodo(todo.id)}}
                style={{
                  padding: '8px',
                  fontSize: '1rem',
                  backgroundColor: '#ef4444',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease, transform 0.2s ease',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#dc2626';
                  e.target.style.transform = 'scale(1.1)';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = '#ef4444';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;