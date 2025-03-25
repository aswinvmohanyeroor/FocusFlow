# 📋 FocusFlow

**FocusFlow** is a modern task management and productivity web app built using the **MERN stack (MongoDB, Express, React, Node.js)**. It supports user authentication, email reminders, and an admin dashboard for managing users.

---

## 🚀 Features

### ✅ Task Management
- Add, edit, delete tasks
- Set deadlines and reminder emails
- Mark tasks as completed or pending
- Pagination, filtering & search

### 🔐 Authentication
- Secure login & signup (JWT based)
- Role-based access (admin/user)
- Protected routes

### 👨‍💼 Admin Dashboard
- View all users
- Add, delete users
- Promote/demote users (optional)

### 🌙 UI/UX
- Beautiful UI using **Bootstrap**
- Toast notifications with `react-toastify`
- Dark mode toggle (coming soon)
- User info shown in navbar

---

## 📁 Folder Structure

```
FocusFlow/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── .env
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── App.js
│   │   └── index.js
├── README.md
```

---

## ⚙️ Tech Stack

- **Frontend**: React, Axios, Bootstrap, React-Router
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Auth**: JWT + bcrypt
- **UI Libraries**: react-toastify, Bootstrap
- **Tools**: MongoDB Compass, Postman

---

## 🛠️ Setup Instructions

### 📦 Backend

```bash
cd backend
npm install
npm start
```

✅ Make sure to configure your `.env`:
```
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_app_password
```

### 💻 Frontend

```bash
cd frontend
npm install
npm start
```

---

## 👨‍🔧 Admin Login

```
Email: admin@focusflow.com
Password: admin123
```

(Create using `createAdmin.js` or register and manually set `role: "admin"` in MongoDB)

---

## 🔐 Security Notes

- Passwords are hashed using bcrypt
- JWTs are stored in localStorage (consider HttpOnly cookies for production)
- Admin routes are protected via middleware and UI-level role checks

---

## 🙌 Credits

Made with ❤️ by [You!]
