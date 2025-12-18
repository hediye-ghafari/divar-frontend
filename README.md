**Divar – OTP Authentication System**

A simplified Divar-style mobile authentication system built to demonstrate a real-world OTP login flow, production-ready frontend architecture, and integration with an existing backend API.

This project showcases how a modern React application communicates with a Node.js backend to provide secure authentication and role-based access.

⚠️ Important Notice (Read First)

🚨 This project consists of two separate applications and both must be running simultaneously:

backend-divar → API & authentication server
frontend-divar → React client application

❗ If only one of them is running, the application will not work correctly.
To fully use the website and its features:
Start the backend server
Start the frontend application
Make sure the frontend API base URL matches the backend port

## 🚀 Features

Frontend (React)
React + Vite
Two-step authentication (Send OTP → Verify OTP)
Clean and modular architecture
React Query for data-fetching and caching
Axios-based API layer
Cookie-based token handling
UI built with CSS Modules
Reusable components and templates

Backend (Node.js)
Although the backend was not written by me, the application includes a structure similar to real-world production backends:
Express-based API
Modular architecture using modules
OTP generated via Node’s native crypto
JWT access & refresh tokens
MongoDB + Mongoose
Centralized error handling
Authorization middleware
Fully prepared for SMS provider integration

## 🛠️ Admin Panel – Role Access & Option Management

The project includes a minimal admin panel designed for demonstration purposes.
Admin permissions are handled through a simple role-checking mechanism:

## 🔑 Admin Login Logic (Demo Mode)

A predefined phone number is treated as an admin account.
When logged in using that number, the user gains access to the admin section.
This is only a placeholder mechanism intended to show that:
Role-based routing
Permission checks
Protected admin components
are fully implemented on the frontend and ready for expansion.
You can replace this placeholder with a real RBAC (Role-Based Access Control) system at any time.

## ⚙️ Admin Option Management API

Inside the admin panel, there is a full CRUD interface for managing Options, which are used inside categories.
The UI communicates with the backend through the following endpoints:
Create Option
POST /option
Creates a new option for a specific category.
Get All Options
GET /option
Returns a list of all options.
Get Option by ID
GET /option/{id}
Fetches a single option and its data using its ID.
Update Option
PUT /option/{id}
Updates an existing option’s information.
Delete Option
DELETE /option/{id}
Removes an option from the system.

Even though the backend was pre-built, the admin UI and all integrations, API calls, and state management were fully implemented by me.

## 🧰 Technologies Used

Frontend
React
Vite
React Query
Axios
CSS Modules

Backend
Node.js
Express
MongoDB / Mongoose
JWT
dotenv
Crypto

## 🔐 Security Notes

OTP codes expire in 2 minutes
Access & refresh tokens are generated after successful OTP verification
Refresh token supports long-term login
Backend stores tokens securely
Frontend handles tokens via cookies for improved security

## 🎯 Project Purpose

This project was created as part of my personal portfolio to demonstrate:
Real-world mobile authentication flow
React Query for state & server synchronization
Integration with an actual backend API
Token handling & session management
Practical, production-style folder structure
Ability to develop a complete login experience end-to-end

## ⭐ Additional Note (Important)

The backend codebase was originally implemented by another developer.
My contribution focuses on:
Full frontend development
Implementing the authentication UI/UX
Integrating the backend API
Handling state, validation, and application flow
Managing tokens and user sessions
Understanding and working with an existing backend architecture
This experience demonstrates that I can effectively collaborate in real-world environments, work with existing codebases, and build reliable client-side features on top of them — a skill that is highly valuable in professional teams.

## 🚀 Future Improvements

Connect the backend to a real SMS provider (e.g., Kavenegar, SMS.ir)
Add rate limiting to OTP requests
Improve UI & loading states
Improve the admin panel UI
Implement refresh-token rotation
Add better form validation & error handling
