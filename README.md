# 📋 FocusFlow

**FocusFlow** is a sleek and feature-rich productivity and task management application built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js). It offers powerful task tracking capabilities with role-based authentication and a dedicated admin dashboard to manage users.

---

## 🚀 Features

### 🔖 Task Management
- Add, edit, delete tasks
- Set due dates & reminder emails
- Mark tasks as ✅ Completed or ⏳ Pending
- Pagination & filtering for easy navigation
- Dark mode support 🌙 (coming soon)

### 🔐 Authentication
- Secure login/signup with **JWT-based auth**
- Role-based access control (`user` / `admin`)
- Password hashing via bcrypt

### 👨‍💼 Admin Dashboard
- View all users
- Add/delete users
- Promote or demote users (admin/user)

### 💡 User Interface
- Responsive design using **Bootstrap**
- Real-time toast alerts via `react-toastify`
- Elegant admin table views
- Navigation bar with logout and user info

---

## 🛠️ Tech Stack

| Layer        | Tech                             |
|--------------|----------------------------------|
| Frontend     | React.js, Bootstrap, Axios       |
| Backend      | Node.js, Express.js              |
| Database     | MongoDB + Mongoose               |
| Auth & Roles | JWT, bcryptjs                    |
| Notifications| react-toastify                   |
| UI Enhancers | Bootstrap 5, FontAwesome (icons) |

---

## 📁 Project Structure

```
FocusFlow/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── server.js
│   └── createAdmin.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── App.js
│   │   └── index.js
│   └── public/
├── .env
└── README.md
```

---

## 🔧 Setup Instructions

### 📦 Backend

```bash
cd backend
npm install
```

#### Create `.env` in backend folder:

```
MONGO_URI=mongodb://localhost:27017/focusflow
JWT_SECRET=your_secret_key
EMAIL_USER=youremail@example.com
EMAIL_PASS=your_email_app_password
```

```bash
npm start
```

✅ **Optional:** Create default admin: 
create admin file is included , after creation you can delete the page
```bash
node createAdmin.js
```

---

### 💻 Frontend

```bash
cd frontend
npm install
npm start
```

---

## 👤 Admin Login

```
Email: admin@focusflow.com
Password: admin123
```

🛠 You can change credentials in `createAdmin.js` or directly in MongoDB Compass.

---

## 🔒 Security Considerations

- Passwords are securely hashed using bcrypt
- JWT tokens are used for all protected routes
- Auth routes are role-protected via middleware (`protect`, `isAdmin`)
- Admin-only routes are hidden on UI and blocked on backend

---

## 📬 Reminders & Emails

If enabled, email reminders are sent before a task deadline using your configured email service.

---

## 🧠 Future Enhancements

- 🔔 Email/SMS notifications
- 📊 Task analytics dashboard
- 🌓 Fully featured dark mode toggle
- 🔁 Task sharing & collaboration

---

## 🧑‍💻 Author

Made by  Veen

---

