📝 Full-Stack Task Manager Application
A full-featured task management application built with React, Node.js, Express, and MongoDB. It includes secure authentication, efficient state management, and AI-powered task suggestions using the Gemini API.

🚀 Features
🔐 User Authentication (JWT-based)

🧑‍💼 Role-based access (User)

📝 CRUD Operations: Create, Read, Update, Delete Tasks

🤖 AI-Powered Task Suggestions (via Gemini API)

✅ Input Validation using Zod

🔄 Efficient State Management using Recoil

🌐 React Router for Navigation

⚙️ Token Verification Middleware

☁️ MongoDB Atlas Integration

🧠 Workflow Overview
User is prompted to Sign In or Sign Up

If the user exists → redirect to task dashboard

If not, user data is created and stored securely in MongoDB

After authentication:

Access to Task Dashboard

Perform Add / Read / Update / Delete tasks

Navigate to AI suggestion page for smart task help

All state updates are synced with backend through API calls

🛠 Tech Stack
Area	Technologies
Frontend	React, Recoil, React Router, Fetch API
Backend	Node.js, Express.js, Zod, JWT
Database	MongoDB (via Mongoose)
AI API	Gemini API (for task suggestions)
Tools Used	VS Code, Postman, MongoDB Compass, Git
