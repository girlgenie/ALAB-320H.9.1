import React, { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editedTodo, setEditedTodo] = useState('');
  
  const handleNewTodoChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleAddTodo = () => {
    // Check if the new todo text is not empty
    if (newTodo.trim() !== '') {
      // Create a new todo object
      const newTodoItem = {
        id: Date.now(), // Generate a unique ID
        text: newTodo, // Set the todo text
        complete: false // Set the completion status to false
      };
  
      // Add the new todo item to the beginning of the todos array
      setTodos([newTodoItem, ...todos]);
  
      // Clear the input field for adding new todos
      setNewTodo('');
    }
  };
  

  const handleToggleComplete = (id) => {
    // Update todos array by mapping through each todo
    const updatedTodos = todos.map((todo) => {
      // Check if the todo id matches the id passed to the function
      if (todo.id === id) {
        // If matched, toggle the completeness status of the todo
        return { ...todo, complete: !todo.complete };
      }
      // If not matched, return the todo unchanged
      return todo;
    });
  
    // Set the updated todos array
    setTodos(updatedTodos);
  };
  

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };
  

  const handleEditTodo = (id, text) => {
    setEditingTodoId(id);
    setEditedTodo(text);
  };

  const handleSaveEdit = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, text: editedTodo } : todo
    );
    setTodos(updatedTodos);
    setEditingTodoId(null);
  };
  

  return (
    <div className="App">
      <h1>Todo List</h1>
      <input
        type="text"
        placeholder="Add new todo"
        value={newTodo}
        onChange={handleNewTodoChange}
      />
      <button onClick={handleAddTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.complete}
              onChange={() => handleToggleComplete(todo.id)}
            />
            {editingTodoId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editedTodo}
                  onChange={(e) => setEditedTodo(e.target.value)}
                />
                <button onClick={() => handleSaveEdit(todo.id)}>Save</button>
              </>
            ) : (
              <>
                <span style={{ textDecoration: 'none', color: todo.complete ? 'gray' : 'black' }}>
                {todo.text}
                </span>

                <button onClick={() => handleEditTodo(todo.id, todo.text)}>Edit</button>
                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  disabled={!todo.complete}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
