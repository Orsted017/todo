import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [error, setError] = useState(null);

  const fetchTodos = async () => {
    try {
      const res = await axios.get('https://todo-backend-qkks.onrender.com/todos');
      setTodos(res.data);
    } catch (err) {
      console.error('Xatolik todos olishda:', err);
    }
  };

  const addTodo = async () => {
    const trimmed = title.trim();
    if (trimmed === '') {
      setError("Vazifa nomi bo'sh bo'lishi mumkin emas");
      return;
    }

    try {
      await axios.post('https://todo-backend-qkks.onrender.com/todos', { title: trimmed });
      setTitle('');
      setError(null);
      fetchTodos();
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.error || "Xatolik yuz berdi");
    }
  };

  const deleteTodo = async (DelId) => {
    try {
      await axios.delete(`https://todo-backend-qkks.onrender.com/todos/${DelId}`);
      fetchTodos();
    } catch (err) {
      console.error("O‘chirishda xatolik:", err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div style={{ maxWidth: '500px', margin: '20px auto', padding: '20px', backgroundColor: '#1a1a1a', minHeight: '100vh', color: '#d9d9d9', fontFamily: "'Montserrat', sans-serif", display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div>
        <h1 style={{ fontSize: '3rem', fontWeight: '700', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '40px', borderBottom: '3px solid #4a4a4a', paddingBottom: '15px', textAlign: 'center' }}>To-Do List</h1>
        <div style={{ display: 'flex', gap: '15px', marginBottom: '10px', justifyContent: 'center' }}>
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
              maxWidth: '300px'
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
            }}
          >
            Qo‘shish
          </button>
        </div>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      </div>

      <div style={{ backgroundColor: '#262626', borderRadius: '8px', padding: '20px', border: '1px solid #4a4a4a', boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)', marginTop: 'auto' }}>
        <ul style={{ listStyle: 'none', padding: '0' }}>
          {todos.map((todo) => (
            <li key={todo.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', marginBottom: '15px', backgroundColor: '#2d2d2d', borderRadius: '4px', border: '1px solid #4a4a4a' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: '500' }}>{todo.title}</span>
              <button onClick={() => {deleteTodo(todo.id)}} style={{ backgroundColor: '#ef4444', color: '#fff', border: 'none', borderRadius: '4px', width: '32px', height: '32px', cursor: 'pointer' }}>
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
