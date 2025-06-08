"use client"

export interface WebProblem {
  id: number
  title: string
  category: "Frontend" | "Backend" | "Full-Stack" | "Database" | "API"
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  description: string
  requirements: string[]
  technologies: string[]
  starterCode: {
    html?: string
    css?: string
    javascript?: string
    react?: string
    nodejs?: string
    mongodb?: string
  }
  expectedOutput?: string
  hints: string[]
  learningObjectives: string[]
  estimatedTime: string
  tags: string[]
  maxScore: number
}

export const webProblems: WebProblem[] = [
  {
    id: 1,
    title: "Responsive Navigation Bar",
    category: "Frontend",
    difficulty: "Beginner",
    description: `Create a responsive navigation bar that works on both desktop and mobile devices. The navigation should include a hamburger menu for mobile screens and smooth transitions.`,
    requirements: [
      "Create a horizontal navigation bar for desktop",
      "Implement a hamburger menu for mobile screens (< 768px)",
      "Include at least 5 navigation links",
      "Add smooth transitions and hover effects",
      "Make it fully responsive",
      "Use semantic HTML elements",
    ],
    technologies: ["HTML", "CSS", "JavaScript"],
    starterCode: {
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Responsive Navigation</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <nav class="navbar">
        <!-- Your navigation code here -->
    </nav>
    
    <main>
        <h1>Welcome to Our Website</h1>
        <p>This is the main content area.</p>
    </main>
    
    <script src="script.js"></script>
</body>
</html>`,
      css: `/* Reset and base styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
}

/* Your CSS code here */
.navbar {
    /* Add your navigation styles */
}

/* Mobile styles */
@media (max-width: 768px) {
    /* Add mobile-specific styles */
}`,
      javascript: `// Your JavaScript code here
document.addEventListener('DOMContentLoaded', function() {
    // Add your navigation functionality
});`,
    },
    hints: [
      "Use flexbox for layout alignment",
      "Consider using CSS transforms for the hamburger menu animation",
      "Use media queries for responsive design",
      "Add aria-labels for accessibility",
    ],
    learningObjectives: [
      "Understanding responsive design principles",
      "Working with CSS flexbox",
      "Implementing mobile-first design",
      "JavaScript DOM manipulation",
    ],
    estimatedTime: "2-3 hours",
    tags: ["HTML", "CSS", "JavaScript", "Responsive Design", "Navigation"],
    maxScore: 100,
  },
  {
    id: 2,
    title: "Todo App with Local Storage",
    category: "Frontend",
    difficulty: "Intermediate",
    description: `Build a fully functional todo application using vanilla JavaScript. The app should allow users to add, edit, delete, and mark todos as complete. All data should persist in localStorage.`,
    requirements: [
      "Add new todos with input validation",
      "Mark todos as complete/incomplete",
      "Edit existing todos inline",
      "Delete todos with confirmation",
      "Filter todos (All, Active, Completed)",
      "Persist data in localStorage",
      "Show todo count",
      "Clear all completed todos",
    ],
    technologies: ["HTML", "CSS", "JavaScript", "localStorage"],
    starterCode: {
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
            <!-- Add input form here -->
        </div>
        
        <div class="todo-filters">
            <!-- Add filter buttons here -->
        </div>
        
        <div class="todo-list">
            <!-- Todo items will be rendered here -->
        </div>
        
        <div class="todo-footer">
            <!-- Add footer with count and clear button -->
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
}

/* Add your styles here */`,
      javascript: `class TodoApp {
    constructor() {
        this.todos = this.loadTodos();
        this.filter = 'all';
        this.init();
    }
    
    init() {
        // Initialize your app here
        this.render();
        this.bindEvents();
    }
    
    loadTodos() {
        // Load todos from localStorage
        return JSON.parse(localStorage.getItem('todos')) || [];
    }
    
    saveTodos() {
        // Save todos to localStorage
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }
    
    addTodo(text) {
        // Add new todo
    }
    
    deleteTodo(id) {
        // Delete todo
    }
    
    toggleTodo(id) {
        // Toggle todo completion
    }
    
    editTodo(id, newText) {
        // Edit todo text
    }
    
    render() {
        // Render the todo list
    }
    
    bindEvents() {
        // Bind event listeners
    }
}

// Initialize the app
const app = new TodoApp();`,
    },
    hints: [
      "Use array methods like filter, map, and find for todo operations",
      "Generate unique IDs using Date.now() or Math.random()",
      "Use event delegation for dynamically created elements",
      "Consider using template literals for HTML generation",
    ],
    learningObjectives: [
      "JavaScript class-based architecture",
      "Working with localStorage API",
      "DOM manipulation and event handling",
      "State management in vanilla JavaScript",
    ],
    estimatedTime: "4-6 hours",
    tags: ["JavaScript", "localStorage", "DOM", "CRUD Operations", "State Management"],
    maxScore: 100,
  },
  {
    id: 3,
    title: "React Counter with Hooks",
    category: "Frontend",
    difficulty: "Beginner",
    description: `Create a React counter application using functional components and hooks. The counter should have increment, decrement, and reset functionality with proper state management.`,
    requirements: [
      "Use React functional components",
      "Implement useState hook for state management",
      "Add increment button (+1)",
      "Add decrement button (-1)",
      "Add reset button (back to 0)",
      "Display current count value",
      "Add step size input (increment/decrement by custom amount)",
      "Prevent negative numbers",
    ],
    technologies: ["React", "JavaScript", "CSS"],
    starterCode: {
      react: `import React, { useState } from 'react';
import './Counter.css';

function Counter() {
  // Add your state here
  
  // Add your functions here
  
  return (
    <div className="counter-container">
      <h1>React Counter</h1>
      
      <div className="counter-display">
        {/* Display count here */}
      </div>
      
      <div className="counter-controls">
        {/* Add buttons here */}
      </div>
      
      <div className="step-control">
        {/* Add step size input here */}
      </div>
    </div>
  );
}

export default Counter;`,
      css: `.counter-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 30px;
  text-align: center;
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.counter-display {
  font-size: 4rem;
  font-weight: bold;
  color: #333;
  margin: 30px 0;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 10px;
}

.counter-controls {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin: 20px 0;
}

.counter-btn {
  padding: 12px 24px;
  font-size: 18px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.increment {
  background: #28a745;
  color: white;
}

.decrement {
  background: #dc3545;
  color: white;
}

.reset {
  background: #6c757d;
  color: white;
}

.counter-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

.step-control {
  margin-top: 20px;
}

.step-input {
  padding: 8px 12px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 5px;
  margin-left: 10px;
  width: 80px;
}`,
    },
    hints: [
      "Use useState to manage the count state",
      "Use parseInt() to convert string input to number",
      "Add conditional logic to prevent negative numbers",
      "Use the functional form of setState for updates based on previous state",
    ],
    learningObjectives: [
      "React functional components",
      "useState hook for state management",
      "Event handling in React",
      "Controlled components for form inputs",
    ],
    estimatedTime: "2-3 hours",
    tags: ["React", "Hooks", "State Management", "Functional Components"],
    maxScore: 100,
  },
  {
    id: 4,
    title: "React Todo List with Context",
    category: "Frontend",
    difficulty: "Intermediate",
    description: `Build a React todo application using Context API for state management. Include multiple components and demonstrate proper React patterns.`,
    requirements: [
      "Use React Context API for global state",
      "Create separate components (TodoList, TodoItem, AddTodo)",
      "Implement useContext and useReducer hooks",
      "Add, edit, delete, and toggle todos",
      "Filter todos by status (All, Active, Completed)",
      "Persist data in localStorage",
      "Add todo count display",
      "Implement proper error handling",
    ],
    technologies: ["React", "Context API", "JavaScript", "CSS"],
    starterCode: {
      react: `import React, { createContext, useContext, useReducer, useEffect } from 'react';
import './TodoApp.css';

// Todo Context
const TodoContext = createContext();

// Todo Reducer
const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      // Implement add todo logic
      return state;
    case 'TOGGLE_TODO':
      // Implement toggle todo logic
      return state;
    case 'DELETE_TODO':
      // Implement delete todo logic
      return state;
    case 'EDIT_TODO':
      // Implement edit todo logic
      return state;
    case 'SET_FILTER':
      // Implement filter logic
      return state;
    case 'LOAD_TODOS':
      // Implement load todos logic
      return state;
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
    // Implement localStorage loading
  }, []);

  // Save todos to localStorage when todos change
  useEffect(() => {
    // Implement localStorage saving
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
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement add todo logic
  };

  return (
    <form onSubmit={handleSubmit} className="add-todo">
      {/* Add input and submit button */}
    </form>
  );
};

// TodoItem Component
const TodoItem = ({ todo }) => {
  const { dispatch } = useTodos();
  
  return (
    <div className="todo-item">
      {/* Implement todo item UI */}
    </div>
  );
};

// TodoList Component
const TodoList = () => {
  const { state } = useTodos();
  
  const filteredTodos = () => {
    // Implement filtering logic
    return state.todos;
  };

  return (
    <div className="todo-list">
      {filteredTodos().map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

// Filter Component
const TodoFilter = () => {
  const { state, dispatch } = useTodos();
  
  return (
    <div className="todo-filter">
      {/* Implement filter buttons */}
    </div>
  );
};

// Main App Component
function TodoApp() {
  return (
    <TodoProvider>
      <div className="todo-app">
        <h1>React Todo with Context</h1>
        <AddTodo />
        <TodoFilter />
        <TodoList />
      </div>
    </TodoProvider>
  );
}

export default TodoApp;`,
      css: `.todo-app {
  max-width: 600px;
  margin: 50px auto;
  padding: 30px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.add-todo {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.add-todo input {
  flex: 1;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
}

.add-todo button {
  padding: 12px 24px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.todo-filter {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  justify-content: center;
}

.filter-btn {
  padding: 8px 16px;
  border: 2px solid #ddd;
  background: white;
  border-radius: 5px;
  cursor: pointer;
}

.filter-btn.active {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

.todo-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 8px;
  margin-bottom: 10px;
}

.todo-item.completed {
  opacity: 0.6;
  text-decoration: line-through;
}

.todo-checkbox {
  width: 20px;
  height: 20px;
}

.todo-text {
  flex: 1;
  font-size: 16px;
}

.todo-actions {
  display: flex;
  gap: 5px;
}

.action-btn {
  padding: 5px 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 12px;
}

.edit-btn {
  background: #ffc107;
  color: black;
}

.delete-btn {
  background: #dc3545;
  color: white;
}`,
    },
    hints: [
      "Use useReducer for complex state management",
      "Create action creators for better organization",
      "Use useEffect to sync with localStorage",
      "Implement proper error boundaries",
    ],
    learningObjectives: [
      "React Context API for state management",
      "useReducer hook for complex state logic",
      "Component composition and separation of concerns",
      "React hooks and lifecycle management",
    ],
    estimatedTime: "6-8 hours",
    tags: ["React", "Context API", "useReducer", "State Management", "Hooks"],
    maxScore: 100,
  },
  {
    id: 5,
    title: "Express.js REST API with Authentication",
    category: "Backend",
    difficulty: "Intermediate",
    description: `Build a complete REST API using Express.js with user authentication, CRUD operations, and proper middleware implementation.`,
    requirements: [
      "Create user registration and login endpoints",
      "Implement JWT authentication middleware",
      "Add CRUD operations for a resource (e.g., posts)",
      "Include input validation and sanitization",
      "Implement proper error handling middleware",
      "Add rate limiting",
      "Include API documentation comments",
      "Add password hashing with bcrypt",
    ],
    technologies: ["Node.js", "Express.js", "JWT", "bcrypt"],
    starterCode: {
      nodejs: `const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');

const app = express();

// Middleware
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// In-memory storage (replace with database in production)
let users = [];
let posts = [];
let userIdCounter = 1;
let postIdCounter = 1;

// JWT Secret (use environment variable in production)
const JWT_SECRET = 'your-secret-key';

// Authentication middleware
const authenticateToken = (req, res, next) => {
  // Implement JWT authentication
  // Extract token from Authorization header
  // Verify token and add user to req.user
  next();
};

// Input validation middleware
const validateUser = (req, res, next) => {
  // Implement user validation
  // Check email format, password strength, etc.
  next();
};

const validatePost = (req, res, next) => {
  // Implement post validation
  // Check title and content requirements
  next();
};

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
};

// Routes

/**
 * POST /api/auth/register
 * Register a new user
 */
app.post('/api/auth/register', validateUser, async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    // Check if user already exists
    
    // Hash password
    
    // Create user
    
    // Generate JWT token
    
    res.status(201).json({ message: 'User created successfully', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/auth/login
 * Login user
 */
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    
    // Verify password
    
    // Generate JWT token
    
    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

/**
 * GET /api/posts
 * Get all posts
 */
app.get('/api/posts', (req, res) => {
  try {
    // Implement get all posts
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/posts
 * Create a new post (authenticated)
 */
app.post('/api/posts', authenticateToken, validatePost, (req, res) => {
  try {
    // Implement create post
    res.status(201).json({ message: 'Post created successfully', post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * PUT /api/posts/:id
 * Update a post (authenticated, owner only)
 */
app.put('/api/posts/:id', authenticateToken, validatePost, (req, res) => {
  try {
    // Implement update post
    res.json({ message: 'Post updated successfully', post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * DELETE /api/posts/:id
 * Delete a post (authenticated, owner only)
 */
app.delete('/api/posts/:id', authenticateToken, (req, res) => {
  try {
    // Implement delete post
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});

module.exports = app;`,
    },
    hints: [
      "Use bcrypt.hash() to hash passwords before storing",
      "Use jwt.sign() to create tokens and jwt.verify() to verify them",
      "Implement proper error status codes (400, 401, 403, 404, 500)",
      "Use middleware for common functionality like authentication",
    ],
    learningObjectives: [
      "Express.js middleware and routing",
      "JWT authentication implementation",
      "RESTful API design principles",
      "Error handling and validation",
    ],
    estimatedTime: "8-10 hours",
    tags: ["Node.js", "Express.js", "JWT", "Authentication", "REST API"],
    maxScore: 100,
  },
  {
    id: 6,
    title: "MongoDB CRUD Operations with Mongoose",
    category: "Database",
    difficulty: "Intermediate",
    description: `Implement a complete CRUD system using MongoDB and Mongoose with proper schema design, validation, and error handling.`,
    requirements: [
      "Define Mongoose schemas with validation",
      "Implement Create, Read, Update, Delete operations",
      "Add data validation and error handling",
      "Include population for related documents",
      "Implement pagination for large datasets",
      "Add indexing for performance",
      "Include aggregation pipeline examples",
      "Add proper connection handling",
    ],
    technologies: ["MongoDB", "Mongoose", "Node.js"],
    starterCode: {
      nodejs: `const mongoose = require('mongoose');

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/crud_app', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: 'Please enter a valid email'
    }
  },
  age: {
    type: Number,
    min: [0, 'Age cannot be negative'],
    max: [120, 'Age cannot exceed 120']
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }]
}, {
  timestamps: true
});

// Post Schema
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    minlength: [10, 'Content must be at least 10 characters']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tags: [String],
  published: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Create indexes for performance
userSchema.index({ email: 1 });
postSchema.index({ author: 1, published: 1 });
postSchema.index({ tags: 1 });

const User = mongoose.model('User', userSchema);
const Post = mongoose.model('Post', postSchema);

// CRUD Operations Class
class CRUDOperations {
  
  // User CRUD Operations
  
  /**
   * Create a new user
   */
  static async createUser(userData) {
    try {
      // Implement user creation
      const user = new User(userData);
      await user.save();
      return user;
    } catch (error) {
      throw new Error(\`Error creating user: \${error.message}\`);
    }
  }
  
  /**
   * Get all users with pagination
   */
  static async getUsers(page = 1, limit = 10) {
    try {
      // Implement pagination
      const skip = (page - 1) * limit;
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
   */
  static async getUserById(userId) {
    try {
      // Implement get user by ID with population
      const user = await User.findById(userId).populate('posts');
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw new Error(\`Error fetching user: \${error.message}\`);
    }
  }
  
  /**
   * Update user
   */
  static async updateUser(userId, updateData) {
    try {
      // Implement user update
      const user = await User.findByIdAndUpdate(
        userId,
        updateData,
        { new: true, runValidators: true }
      );
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw new Error(\`Error updating user: \${error.message}\`);
    }
  }
  
  /**
   * Delete user
   */
  static async deleteUser(userId) {
    try {
      // Implement user deletion (also delete related posts)
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }
      
      // Delete all posts by this user
      await Post.deleteMany({ author: userId });
      
      // Delete the user
      await User.findByIdAndDelete(userId);
      
      return { message: 'User and related posts deleted successfully' };
    } catch (error) {
      throw new Error(\`Error deleting user: \${error.message}\`);
    }
  }
  
  // Post CRUD Operations
  
  /**
   * Create a new post
   */
  static async createPost(postData) {
    try {
      // Implement post creation
      const post = new Post(postData);
      await post.save();
      
      // Add post to user's posts array
      await User.findByIdAndUpdate(
        postData.author,
        { $push: { posts: post._id } }
      );
      
      return post;
    } catch (error) {
      throw new Error(\`Error creating post: \${error.message}\`);
    }
  }
  
  /**
   * Get posts with filtering and pagination
   */
  static async getPosts(filters = {}, page = 1, limit = 10) {
    try {
      // Implement post filtering and pagination
      const query = {};
      
      if (filters.author) query.author = filters.author;
      if (filters.published !== undefined) query.published = filters.published;
      if (filters.tags) query.tags = { $in: filters.tags };
      
      const skip = (page - 1) * limit;
      const posts = await Post.find(query)
        .populate('author', 'name email')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });
      
      const total = await Post.countDocuments(query);
      
      return {
        posts,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      throw new Error(\`Error fetching posts: \${error.message}\`);
    }
  }
  
  /**
   * Get post statistics using aggregation
   */
  static async getPostStats() {
    try {
      // Implement aggregation pipeline
      const stats = await Post.aggregate([
        {
          $group: {
            _id: '$author',
            totalPosts: { $sum: 1 },
            publishedPosts: {
              $sum: { $cond: ['$published', 1, 0] }
            },
            totalViews: { $sum: '$views' },
            avgViews: { $avg: '$views' }
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: '_id',
            foreignField: '_id',
            as: 'author'
          }
        },
        {
          $unwind: '$author'
        },
        {
          $project: {
            authorName: '$author.name',
            authorEmail: '$author.email',
            totalPosts: 1,
            publishedPosts: 1,
            totalViews: 1,
            avgViews: { $round: ['$avgViews', 2] }
          }
        },
        {
          $sort: { totalPosts: -1 }
        }
      ]);
      
      return stats;
    } catch (error) {
      throw new Error(\`Error fetching post statistics: \${error.message}\`);
    }
  }
}

// Example usage and testing
async function runExamples() {
  try {
    await connectDB();
    
    console.log('Running CRUD examples...');
    
    // Create a user
    const user = await CRUDOperations.createUser({
      name: 'John Doe',
      email: 'john@example.com',
      age: 30
    });
    console.log('Created user:', user);
    
    // Create a post
    const post = await CRUDOperations.createPost({
      title: 'My First Post',
      content: 'This is the content of my first post.',
      author: user._id,
      tags: ['javascript', 'mongodb'],
      published: true
    });
    console.log('Created post:', post);
    
    // Get users with pagination
    const usersResult = await CRUDOperations.getUsers(1, 5);
    console.log('Users with pagination:', usersResult);
    
    // Get post statistics
    const stats = await CRUDOperations.getPostStats();
    console.log('Post statistics:', stats);
    
  } catch (error) {
    console.error('Example error:', error.message);
  }
}

// Run examples if this file is executed directly
if (require.main === module) {
  runExamples();
}

module.exports = {
  User,
  Post,
  CRUDOperations,
  connectDB
};`,
    },
    hints: [
      "Use Mongoose validation for data integrity",
      "Implement proper error handling with try-catch blocks",
      "Use populate() to include related document data",
      "Create indexes on frequently queried fields",
    ],
    learningObjectives: [
      "MongoDB schema design with Mongoose",
      "CRUD operations implementation",
      "Data validation and error handling",
      "Database performance optimization",
    ],
    estimatedTime: "6-8 hours",
    tags: ["MongoDB", "Mongoose", "CRUD", "Database", "Node.js"],
    maxScore: 100,
  },
]

export function getWebProblemById(id: number): WebProblem | undefined {
  return webProblems.find((problem) => problem.id === id)
}

export function getCategoryColor(category: string) {
  switch (category) {
    case "Frontend":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    case "Backend":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    case "Full-Stack":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
    case "Database":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
    case "API":
      return "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
  }
}

export function getDifficultyColor(difficulty: string) {
  switch (difficulty) {
    case "Beginner":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    case "Intermediate":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    case "Advanced":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
  }
}
