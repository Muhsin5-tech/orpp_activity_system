
# ORPP Activity Management System

This is a full-stack web application built for the Office of the Registrar of Political Parties (ORPP) to manage organizational activities and events. It allows users to create, view, edit, and search for events, with role-based access for Admins and Users.

## 🔧 Tech Stack

### 🖥️ Frontend
- React.js
- Tailwind CSS
- React Router
- React Big Calendar
- Headless UI

### ⚙️ Backend
- Flask
- Flask-JWT-Extended
- Flask SQLAlchemy
- Flask CORS
- Flask Migrate
- PostgreSQL or SQLite

## 🚀 Features

### 👥 Authentication
- JWT-based login and signup
- Role-based access control (Admin / User)

### 📅 Activity Management
- Add, update, delete events
- Assign events to departments
- Upload attachments
- Calendar view (monthly, weekly, daily)
- Filter/search activities

### 🧑‍💼 Departments
- Filter activities by department

### 🔎 Search
- Global search for activities by title, category, venue, or description

## 📁 Project Structure

```
orpp_activity_system/
├── backend/
│   ├── app/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── activities/
│   │   ├── models.py
│   │   ├── __init__.py
│   │   ├── extensions.py
│   │   ├── utils.py
│   ├── instance
│   │   ├── uploads/
│   │   ├── orpp.db
│   ├── config.py
│   ├── requirements.txt
│   └── run.py
├── frontend/
│   ├── public
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── utils/
│   │   ├── activityApi.js
│   │   ├── api.js
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── userApi.js
│   │   └── main.jsx
│   ├── .gitignore
│   ├── exlint.config.js
│   ├── index.css
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.cjs
│   ├── tailwind.config.cjs
│   ├── vite.config.js
└── README.md
```

## ⚙️ Installation & Setup

### Backend (Flask)

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
export FLASK_APP=run.py
export FLASK_ENV=development
flask db init
flask db migrate -m "Initial migration"
flask db upgrade
flask run
```

API will run at: `http://127.0.0.1:5000/api`

### Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

Frontend will run at: `http://localhost:5173`

## 🔐 Default Roles

- Admin: Manage users, departments, and activities
- User: View and search activities

## 🔍 API Endpoints

| Method | Endpoint                     | Description               |
|--------|------------------------------|---------------------------|
| GET    | `/api/activities`            | Get all activities        |
| POST   | `/api/activities`            | Create new activity       |
| PUT    | `/api/activities/:id`        | Update activity           |
| DELETE | `/api/activities/:id`        | Delete activity           |
| GET    | `/api/activities/search?q=`  | Search activities         |
| POST   | `/api/auth/login`            | Login                     |
| POST   | `/api/auth/signup`           | Register new user         |
| GET    | `/api/users`                 | Get all users (admin)     |

## 📦 Deployment

Deploy frontend on Netlify/Vercel and backend on Render/Railway/Heroku.

## 🙌 Author

Built with ❤️ by **Muhsin Abdullahi**  
GitHub: [@Muhsin5-tech](https://github.com/Muhsin5-tech)

## 📄 License

MIT License
