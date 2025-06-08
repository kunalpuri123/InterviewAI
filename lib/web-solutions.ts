"use client"

export const webSolutions = {
  // Todo App with Local Storage Solution
  2: {
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Todo App</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Todo App</h1>
        
        <div class="todo-input">
            <form id="todo-form">
                <input type="text" id="todo-input" placeholder="Add a new task..." required>
                <button type="submit" id="add-button">Add</button>
            </form>
        </div>
        
        <div class="todo-filters">
            <button class="filter-btn active" data-filter="all">All</button>
            <button class="filter-btn" data-filter="active">Active</button>
            <button class="filter-btn" data-filter="completed">Completed</button>
        </div>
        
        <div class="todo-list" id="todo-list">
            <!-- Todo items will be rendered here -->
        </div>
        
        <div class="todo-footer">
            <span id="todo-count">0 items left</span>
            <button id="clear-completed">Clear completed</button>
        </div>
    </div>
    
    <script src="script.js"></script>
</body>
</html>`,
    css: `body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    margin: 0;
    padding: 20px;
}

.container {
    max-width: 600px;
    margin: 0 auto;
    background: white;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    overflow: hidden;
    padding: 20px;
}

h1 {
    text-align: center;
    color: #333;
    margin-bottom: 20px;
}

.todo-input {
    margin-bottom: 20px;
}

#todo-form {
    display: flex;
    gap: 10px;
}

#todo-input {
    flex: 1;
    padding: 12px;
    border: 2px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
}

#add-button {
    padding: 12px 20px;
    background: #764ba2;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background 0.3s;
}

#add-button:hover {
    background: #667eea;
}

.todo-filters {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    gap: 10px;
}

.filter-btn {
    padding: 8px 16px;
    background: #f5f5f5;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s;
}

.filter-btn.active {
    background: #764ba2;
    color: white;
}

.todo-list {
    margin-bottom: 20px;
}

.todo-item {
    display: flex;
    align-items: center;
    padding: 12px;
    border-bottom: 1px solid #eee;
    animation: fadeIn 0.3s;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
}

.todo-checkbox {
    margin-right: 10px;
    width: 20px;
    height: 20px;
    cursor: pointer;
}

.todo-text {
    flex: 1;
    font-size: 16px;
}

.todo-text.completed {
    text-decoration: line-through;
    color: #999;
}

.todo-text.editing {
    padding: 5px;
    border: 1px solid #ddd;
    border-radius: 3px;
    outline: none;
}

.todo-actions {
    display: flex;
    gap: 5px;
}

.todo-edit, .todo-delete {
    padding: 5px 10px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    font-size: 12px;
}

.todo-edit {
    background: #f0ad4e;
    color: white;
}

.todo-delete {
    background: #d9534f;
    color: white;
}

.todo-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 15px;
    border-top: 1px solid #eee;
}

#todo-count {
    color: #777;
}

#clear-completed {
    padding: 5px 10px;
    background: #f5f5f5;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    color: #777;
}

#clear-completed:hover {
    background: #e0e0e0;
}`,
    javascript: `class TodoApp {
    constructor() {
        this.todos = this.loadTodos();
        this.filter = 'all';
        this.init();
    }
    
    init() {
        // Initialize the app
        this.todoForm = document.getElementById('todo-form');
        this.todoInput = document.getElementById('todo-input');
        this.todoList = document.getElementById('todo-list');
        this.todoCount = document.getElementById('todo-count');
        this.clearCompletedBtn = document.getElementById('clear-completed');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        
        this.render();
        this.bindEvents();
    }
    
    loadTodos() {
        // Load todos from localStorage
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        return todos;
    }
    
    saveTodos() {
        // Save todos to localStorage
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }
    
    addTodo(text) {
        // Validate and add new todo
        const trimmedText = text.trim();
        if (trimmedText.length === 0) return;
        
        const todo = {
            id: Date.now(),
            text: trimmedText,
            completed: false
        };
        
        this.todos.push(todo);
        this.saveTodos();
        this.render();
        
        console.log('Todo added:', todo);
    }
    
    deleteTodo(id) {
        // Delete todo with confirmation
        if (confirm('Are you sure you want to delete this task?')) {
            this.todos = this.todos.filter(todo => todo.id !== id);
            this.saveTodos();
            this.render();
            console.log('Todo deleted:', id);
        }
    }
    
    toggleTodo(id) {
        // Toggle todo completion status
        this.todos = this.todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        });
        
        this.saveTodos();
        this.render();
        console.log('Todo toggled:', id);
    }
    
    editTodo(id, newText) {
        // Edit todo text
        const trimmedText = newText.trim();
        if (trimmedText.length === 0) return;
        
        this.todos = this.todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, text: trimmedText };
            }
            return todo;
        });
        
        this.saveTodos();
        this.render();
        console.log('Todo edited:', id);
    }
    
    setFilter(filter) {
        // Set active filter
        this.filter = filter;
        
        // Update active filter button
        this.filterButtons.forEach(btn => {
            if (btn.dataset.filter === filter) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        this.render();
        console.log('Filter set to:', filter);
    }
    
    clearCompleted() {
        // Clear all completed todos
        this.todos = this.todos.filter(todo => !todo.completed);
        this.saveTodos();
        this.render();
        console.log('Completed todos cleared');
    }
    
    getFilteredTodos() {
        // Get todos based on current filter
        switch (this.filter) {
            case 'active':
                return this.todos.filter(todo => !todo.completed);
            case 'completed':
                return this.todos.filter(todo => todo.completed);
            default:
                return this.todos;
        }
    }
    
    updateTodoCount() {
        // Update the todo count display
        const activeTodos = this.todos.filter(todo => !todo.completed).length;
        this.todoCount.textContent = \`\${activeTodos} item\${activeTodos !== 1 ? 's' : ''} left\`;
    }
    
    render() {
        // Clear the current list
        this.todoList.innerHTML = '';
        
        // Get filtered todos
        const filteredTodos = this.getFilteredTodos();
        
        // Render each todo
        filteredTodos.forEach(todo => {
            const todoItem = document.createElement('div');
            todoItem.className = 'todo-item';
            todoItem.dataset.id = todo.id;
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'todo-checkbox';
            checkbox.checked = todo.completed;
            
            const todoText = document.createElement('div');
            todoText.className = \`todo-text \${todo.completed ? 'completed' : ''}\`;
            todoText.textContent = todo.text;
            
            const actionsDiv = document.createElement('div');
            actionsDiv.className = 'todo-actions';
            
            const editButton = document.createElement('button');
            editButton.className = 'todo-edit';
            editButton.textContent = 'Edit';
            
            const deleteButton = document.createElement('button');
            deleteButton.className = 'todo-delete';
            deleteButton.textContent = 'Delete';
            
            actionsDiv.appendChild(editButton);
            actionsDiv.appendChild(deleteButton);
            
            todoItem.appendChild(checkbox);
            todoItem.appendChild(todoText);
            todoItem.appendChild(actionsDiv);
            
            this.todoList.appendChild(todoItem);
        });
        
        // Update todo count
        this.updateTodoCount();
    }
    
    bindEvents() {
        // Form submission for adding todos
        this.todoForm.addEventListener('submit', e => {
            e.preventDefault();
            this.addTodo(this.todoInput.value);
            this.todoInput.value = '';
        });
        
        // Event delegation for todo list
        this.todoList.addEventListener('click', e => {
            const todoItem = e.target.closest('.todo-item');
            if (!todoItem) return;
            
            const id = parseInt(todoItem.dataset.id);
            
            // Handle checkbox click
            if (e.target.classList.contains('todo-checkbox')) {
                this.toggleTodo(id);
            }
            
            // Handle delete button click
            if (e.target.classList.contains('todo-delete')) {
                this.deleteTodo(id);
            }
            
            // Handle edit button click
            if (e.target.classList.contains('todo-edit')) {
                const todoText = todoItem.querySelector('.todo-text');
                const currentText = todoText.textContent;
                
                // Make the text editable
                todoText.contentEditable = true;
                todoText.classList.add('editing');
                todoText.focus();
                
                // Set up event listeners for editing
                const finishEditing = () => {
                    todoText.contentEditable = false;
                    todoText.classList.remove('editing');
                    const newText = todoText.textContent;
                    if (newText !== currentText) {
                        this.editTodo(id, newText);
                    }
                };
                
                todoText.addEventListener('blur', finishEditing);
                todoText.addEventListener('keydown', e => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        finishEditing();
                    }
                });
            }
        });
        
        // Filter buttons
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.setFilter(btn.dataset.filter);
            });
        });
        
        // Clear completed button
        this.clearCompletedBtn.addEventListener('click', () => {
            this.clearCompleted();
        });
    }
}

// Initialize the app
const app = new TodoApp();
console.log('Todo App initialized');`
  },
  
  // React Counter Solution
  3: {
    react: `import React, { useState } from 'react';
import './Counter.css';

function Counter() {
  // State for counter value and step size
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);
  
  // Increment function
  const increment = () => {
    setCount(prevCount => prevCount + Number(step));
  };
  
  // Decrement function with prevention of negative numbers
  const decrement = () => {
    setCount(prevCount => Math.max(0, prevCount - Number(step)));
  };
  
  // Reset function
  const reset = () => {
    setCount(0);
  };
  
  // Handle step size change
  const handleStepChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value) || 1);
    setStep(value);
  };
  
  return (
    <div className="counter-container">
      <h1>React Counter</h1>
      
      <div className="counter-display">
        {count}
      </div>
      
      <div className="counter-controls">
        <button 
          className="counter-btn decrement" 
          onClick={decrement}
          aria-label="Decrement counter"
        >
          - Decrease
        </button>
        
        <button 
          className="counter-btn reset" 
          onClick={reset}
          aria-label="Reset counter"
        >
          Reset
        </button>
        
        <button 
          className="counter-btn increment" 
          onClick={increment}
          aria-label="Increment counter"
        >
          + Increase
        </button>
      </div>
      
      <div className="step-control">
        <label htmlFor="step-input">Step Size:</label>
        <input 
          id="step-input"
          type="number" 
          className="step-input" 
          value={step}
          onChange={handleStepChange}
          min="1"
        />
      </div>
    </div>
  );
}

export default Counter;`
  },
  
  // React Todo with Context Solution
  4: {
    react: `import React, { createContext, useContext, useReducer, useEffect } from 'react';
import './TodoApp.css';

// Todo Context
const TodoContext = createContext();

// Action types
const ADD_TODO = 'ADD_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const DELETE_TODO = 'DELETE_TODO';
const EDIT_TODO = 'EDIT_TODO';
const SET_FILTER = 'SET_FILTER';
const LOAD_TODOS = 'LOAD_TODOS';

// Todo Reducer
const todoReducer = (state, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: Date.now(),
            text: action.payload,
            completed: false
          }
        ]
      };
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };
    case EDIT_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, text: action.payload.text }
            : todo
        )
      };
    case SET_FILTER:
      return {
        ...state,
        filter: action.payload
      };
    case LOAD_TODOS:
      return {
        ...state,
        todos: action.payload
      };
    default:
      return state;
  }
};

// Todo Provider Component
export const TodoProvider = ({ children }) => {
  const initialState = {
    todos: [],
    filter: 'all'
  };

  const [state, dispatch] = useReducer(todoReducer, initialState);

  // Load todos from localStorage on mount
  useEffect(() => {
    try {
      const storedTodos = localStorage.getItem('todos');
      if (storedTodos) {
        dispatch({ type: LOAD_TODOS, payload: JSON.parse(storedTodos) });
      }
    } catch (error) {
      console.error('Error loading todos from localStorage:', error);
    }
  }, []);

  // Save todos to localStorage when todos change
  useEffect(() => {
    try {
      localStorage.setItem('todos', JSON.stringify(state.todos));
    } catch (error) {
      console.error('Error saving todos to localStorage:', error);
    }
  }, [state.todos]);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

// Custom hook to use Todo Context
export const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodos must be used within TodoProvider');
  }
  return context;
};

// AddTodo Component
const AddTodo = () => {
  const { dispatch } = useTodos();
  const [text, setText] = React.useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedText = text.trim();
    if (trimmedText) {
      dispatch({ type: ADD_TODO, payload: trimmedText });
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-todo">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
        required
      />
      <button type="submit">Add</button>
    </form>
  );
};

// TodoItem Component
const TodoItem = ({ todo }) => {
  const { dispatch } = useTodos();
  const [isEditing, setIsEditing] = React.useState(false);
  const [editText, setEditText] = React.useState(todo.text);
  
  const handleEdit = () => {
    setIsEditing(true);
  };
  
  const handleSave = () => {
    const trimmedText = editText.trim();
    if (trimmedText) {
      dispatch({ 
        type: EDIT_TODO, 
        payload: { id: todo.id, text: trimmedText } 
      });
    }
    setIsEditing(false);
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };
  
  return (
    <div className={\`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        className="todo-checkbox"
        checked={todo.completed}
        onChange={() => dispatch({ type: TOGGLE_TODO, payload: todo.id })}
      />
\
{
  isEditing ? (
    <input
      type="text"
      className="todo-text-input"
      value={editText}
      onChange={(e) => setEditText(e.target.value)}
      onBlur={handleSave}
      onKeyDown={handleKeyDown}
      autoFocus
    />
  ) : (
    <span className="todo-text">{todo.text}</span>
  )
}
;<div className="todo-actions">
  {!isEditing && (
    <button className="edit-btn" onClick={handleEdit}>
      Edit
    </button>
  )}
  <button className="delete-btn" onClick={() => dispatch({ type: DELETE_TODO, payload: todo.id })}>
    Delete
  </button>
</div>
</div>
  )
}

// TodoList Component
const TodoList = () => {
  const { state } = useTodos()

  const filteredTodos = () => {
    switch (state.filter) {
      case "active":
        return state.todos.filter((todo) => !todo.completed)
      case "completed":
        return state.todos.filter((todo) => todo.completed)
      default:
        return state.todos
    }
  }

  if (filteredTodos().length === 0) {
    return <div className="empty-list">No tasks found</div>
  }

  return (
    <div className="todo-list">
      {filteredTodos().map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  )
}

// Filter Component
const TodoFilter = () => {
  const { state, dispatch } = useTodos()

  return (
    <div className="todo-filter">
      <button
        className={`filter-btn ${state.filter === "all" ? "active" : ""}`}
        onClick={() => dispatch({ type: SET_FILTER, payload: "all" })}
      >
        All
      </button>
      <button
        className={`filter-btn ${state.filter === "active" ? "active" : ""}`}
        onClick={() => dispatch({ type: SET_FILTER, payload: "active" })}
      >
        Active
      </button>
      <button
        className={`filter-btn ${state.filter === "completed" ? "active" : ""}`}
        onClick={() => dispatch({ type: SET_FILTER, payload: "completed" })}
      >
        Completed
      </button>
    </div>
  )
}

// TodoFooter Component
const TodoFooter = () => {
  const { state, dispatch } = useTodos()

  const activeTodoCount = state.todos.filter((todo) => !todo.completed).length
  const completedCount = state.todos.length - activeTodoCount

  const clearCompleted = () => {
    state.todos
      .filter((todo) => todo.completed)
      .forEach((todo) => {
        dispatch({ type: DELETE_TODO, payload: todo.id })
      })
  }

  return (
    <div className="todo-footer">
      <span>
        {activeTodoCount} item{activeTodoCount !== 1 ? "s" : ""} left
      </span>
      {completedCount > 0 && (
        <button onClick={clearCompleted} className="clear-btn">
          Clear completed ({completedCount})
        </button>
      )}
    </div>
  )
}

// Main App Component
function TodoApp() {
  return (
    <TodoProvider>
      <div className="todo-app">
        <h1>React Todo with Context</h1>
        <AddTodo />
        <TodoFilter />
        <TodoList />
        <TodoFooter />
      </div>
    </TodoProvider>
  )
}

export default TodoApp
;`
  },
  
  // Express.js REST API Solution
  5: {
    nodejs: `
const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const rateLimit = require("express-rate-limit")

const app = express()

// Middleware
app.use(express.json())

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
})
app.use("/api/", limiter)

// In-memory storage (replace with database in production)
const users = []
const posts = []
let userIdCounter = 1
let postIdCounter = 1

// JWT Secret (use environment variable in production)
const JWT_SECRET = "your-secret-key"

/**
 * Authentication middleware
 * Verifies JWT token from Authorization header
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]

    if (!token) {
      return res.status(401).json({ error: "Authentication token required" })
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ error: "Invalid or expired token" })
      }

      req.user = user
      next()
    })
  } catch (error) {
    res.status(500).json({ error: "Authentication error" })
  }
}

/**
 * User validation middleware
 * Validates user registration and login data
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const validateUser = (req, res, next) => {
  try {
    const { email, password, name } = req.body

    // Check if required fields are present
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" })
    }

    // Validate password strength
    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters long" })
    }

    next()
  } catch (error) {
    res.status(500).json({ error: "Validation error" })
  }
}

/**
 * Post validation middleware
 * Validates post creation and update data
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const validatePost = (req, res, next) => {
  try {
    const { title, content } = req.body

    // Check if required fields are present
    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" })
    }

    // Validate title length
    if (title.length < 3 || title.length > 100) {
      return res.status(400).json({ error: "Title must be between 3 and 100 characters" })
    }

    // Validate content length
    if (content.length < 10) {
      return res.status(400).json({ error: "Content must be at least 10 characters long" })
    }

    next()
  } catch (error) {
    res.status(500).json({ error: "Validation error" })
  }
}

/**
 * Error handling middleware
 * @param {Error} err - Error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const errorHandler = (err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: "Something went wrong!" })
}

// Routes

/**
 * POST /api/auth/register
 * Register a new user
 * @param {string} email - User email
 * @param {string} password - User password
 * @param {string} name - User name (optional)
 * @returns {Object} User data and JWT token
 */
app.post("/api/auth/register", validateUser, async (req, res) => {
  try {
    const { email, password, name } = req.body

    // Check if user already exists
    const existingUser = users.find((user) => user.email === email)
    if (existingUser) {
      return res.status(409).json({ error: "User with this email already exists" })
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const newUser = {
      id: userIdCounter++,
      email,
      password: hashedPassword,
      name: name || email.split("@")[0],
      createdAt: new Date(),
    }

    users.push(newUser)

    // Generate JWT token
    const token = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET, { expiresIn: "24h" })

    // Return user data (without password) and token
    const { password: _, ...userWithoutPassword } = newUser

    res.status(201).json({
      message: "User created successfully",
      user: userWithoutPassword,
      token,
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

/**
 * POST /api/auth/login
 * Login user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Object} User data and JWT token
 */
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body

    // Find user
    const user = users.find((user) => user.email === email)
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "24h" })

    // Return user data (without password) and token
    const { password: _, ...userWithoutPassword } = user

    res.json({
      message: "Login successful",
      user: userWithoutPassword,
      token,
    })
  } catch (error) {
    res.status(401).json({ error: "Invalid credentials" })
  }
})

/**
 * GET /api/posts
 * Get all posts with optional pagination and search
 * @param {number} page - Page number (optional)
 * @param {number} limit - Items per page (optional)
 * @param {string} search - Search term (optional)
 * @returns {Array} List of posts
 */
app.get("/api/posts", (req, res) => {
  try {
    const page = Number.parseInt(req.query.page) || 1
    const limit = Number.parseInt(req.query.limit) || 10
    const search = req.query.search || ""

    // Filter posts by search term
    let filteredPosts = posts
    if (search) {
      filteredPosts = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(search.toLowerCase()) ||
          post.content.toLowerCase().includes(search.toLowerCase()),
      )
    }

    // Paginate results
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex)

    // Add pagination metadata
    const totalPosts = filteredPosts.length
    const totalPages = Math.ceil(totalPosts / limit)

    res.json({
      posts: paginatedPosts,
      pagination: {
        total: totalPosts,
        page,
        limit,
        totalPages,
      },
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

/**
 * GET /api/posts/:id
 * Get a specific post by ID
 * @param {number} id - Post ID
 * @returns {Object} Post data
 */
app.get("/api/posts/:id", (req, res) => {
  try {
    const postId = Number.parseInt(req.params.id)
    const post = posts.find((post) => post.id === postId)

    if (!post) {
      return res.status(404).json({ error: "Post not found" })
    }

    res.json(post)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

/**
 * POST /api/posts
 * Create a new post (authenticated)
 * @param {string} title - Post title
 * @param {string} content - Post content
 * @returns {Object} Created post data
 */
app.post("/api/posts", authenticateToken, validatePost, (req, res) => {
  try {
    const { title, content } = req.body

    // Create new post
    const newPost = {
      id: postIdCounter++,
      title,
      content,
      authorId: req.user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    posts.push(newPost)

    res.status(201).json({
      message: "Post created successfully",
      post: newPost,
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

/**
 * PUT /api/posts/:id
 * Update a post (authenticated, owner only)
 * @param {number} id - Post ID
 * @param {string} title - Updated post title
 * @param {string} content - Updated post content
 * @returns {Object} Updated post data
 */
app.put("/api/posts/:id", authenticateToken, validatePost, (req, res) => {
  try {
    const postId = Number.parseInt(req.params.id)
    const { title, content } = req.body

    // Find post
    const postIndex = posts.findIndex((post) => post.id === postId)

    if (postIndex === -1) {
      return res.status(404).json({ error: "Post not found" })
    }

    // Check if user is the author
    if (posts[postIndex].authorId !== req.user.id) {
      return res.status(403).json({ error: "You can only update your own posts" })
    }

    // Update post
    posts[postIndex] = {
      ...posts[postIndex],
      title,
      content,
      updatedAt: new Date(),
    }

    res.json({
      message: "Post updated successfully",
      post: posts[postIndex],
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

/**
 * DELETE /api/posts/:id
 * Delete a post (authenticated, owner only)
 * @param {number} id - Post ID
 * @returns {Object} Success message
 */
app.delete("/api/posts/:id", authenticateToken, (req, res) => {
  try {
    const postId = Number.parseInt(req.params.id)

    // Find post
    const postIndex = posts.findIndex((post) => post.id === postId)

    if (postIndex === -1) {
      return res.status(404).json({ error: "Post not found" })
    }

    // Check if user is the author
    if (posts[postIndex].authorId !== req.user.id) {
      return res.status(403).json({ error: "You can only delete your own posts" })
    }

    // Delete post
    posts.splice(postIndex, 1)

    res.json({ message: "Post deleted successfully" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" })
})

// Error handling middleware (must be last)
app.use(errorHandler)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});

module.exports = app;`
  },
  
  // MongoDB CRUD Operations Solution
  6: {
    nodejs: `const mongoose = require('mongoose');

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/crud_app", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log("MongoDB connected successfully")
  } catch (error) {
    console.error("MongoDB connection error:", error)
    process.exit(1)
  }
}

// User Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      validate: {
        validator: (v) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(v),
        message: "Please enter a valid email",
      },
    },
    age: {
      type: Number,
      min: [0, "Age cannot be negative"],
      max: [120, "Age cannot exceed 120"],
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  {
    timestamps: true,
  },
)

// Post Schema
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      minlength: [10, "Content must be at least 10 characters"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tags: [String],
    published: {
      type: Boolean,
      default: false,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
)

// Create indexes for performance
userSchema.index({ email: 1 })
postSchema.index({ author: 1, published: 1 })
postSchema.index({ tags: 1 })

const User = mongoose.model("User", userSchema)
const Post = mongoose.model("Post", postSchema)

// CRUD Operations Class
class CRUDOperations {
  
  // User CRUD Operations
  
  /**
   * Create a new user
   * @param {Object} userData - User data to create
   * @returns {Promise<Object>} Created user
   */
  static async createUser(userData) {
    try {
      // Validate user data
      if (!userData.name || !userData.email) {
        throw new Error('Name and email are required');
      }
      
      // Check if user with email already exists
      const existingUser = await User.findOne({ email: userData.email });
      if (existingUser) {
        throw new Error('User with this email already exists');
      }
      
      // Create and save user
      const user = new User(userData);
      await user.save();
      
      return user;
    } catch (error) {
      throw new Error(\`Error creating user: \${error.message}\`);
    }
  }
  
  /**
   * Get all users with pagination
   * @param {number} page - Page number
   * @param {number} limit - Items per page
   * @returns {Promise<Object>} Users with pagination info
   */
  static async getUsers(page = 1, limit = 10) {
    try {
      // Validate pagination parameters
      page = Math.max(1, page);
      limit = Math.max(1, Math.min(100, limit));
      
      const skip = (page - 1) * limit;
      
      // Query users with pagination
      const users = await User.find()
        .populate('posts', 'title published')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });
      
      const total = await User.countDocuments();
      
      return {
        users,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      throw new Error(\`Error fetching users: \${error.message}\`);
    }
  }
  
  /**
   * Get user by ID
   * @param {string} userId - User ID
   * @returns {Promise<Object>} User with populated posts
   */
  static async getUserById(userId) {
    try {
      // Validate userId
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error('Invalid user ID');
      }
      
      // Find user by ID with populated posts
      const user = await User.findById(userId).populate({
        path: 'posts',
        select: 'title content published views createdAt',
        options: { sort: { createdAt: -1 } }
      });
      
      if (!user) {
        throw new Error('User not found');
      }
      
      return user;
    } catch (error) {
      throw new Error(\`Error fetching user
