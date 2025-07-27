import React from 'react';
import DynamicForm from './DynamicForm.jsx'; // Assuming you saved the main form logic in this file
import './App.css'; // Importing CSS for styling

const sampleSchema = [
  {
    "title": "Name",
    "name": "name",
    "placeholder": "Enter your name",
    "type": "text",
    "validator": "^[a-zA-Z ]{3,}$",
    "value": "",
    "required": true,
    "error": "Name must be at least 3 letters."
  },
  {
    "title": "Email",
    "name": "email",
    "placeholder": "you@example.com",
    "type": "email",
    "validator": "^[\\w.-]+@[\\w.-]+\\.\\w{2,4}$",
    "required": true,
    "value": "",
    "error": "Invalid email format."
  },
  {
    "title": "Age",
    "name": "age",
    "type": "number",
    "min": "18",
    "max": "99",
    "resolution": "1",
    "required": false,
    "value": "",
    "error": "Age must be between 18 and 99."
  },
  {
    "title": "Primary Language",
    "name": "language",
    "type": "select",
    "data": [
      { "id": "js", "title": "JavaScript" },
      { "id": "py", "title": "Python" },
      { "id": "rb", "title": "Ruby" }
    ],
    "required": true,
    "value": "py",
    "error": "Please select a language."
  },
  {
    "title": "Upload Profile Picture",
    "name": "profile_pic",
    "type": "file",
    "data": {
      "url": "https://httpbin.org/post",
      "method": "POST",
      "headers": {
        "Authorization": "Bearer sampleToken"
      }
    },
    "required": true,
    "error": "Profile picture is required."
  }
];

function App() {
  return (
    <div className="app-container">
      <h1>Dynamic Form Creator</h1>
      <DynamicForm schema={sampleSchema} />
    </div>
  );
}

export default App;
