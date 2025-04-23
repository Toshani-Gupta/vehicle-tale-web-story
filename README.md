# 🚗 Vehicle Registration System

A full-stack web application that allows users to register vehicles, manage contact details, and log service history.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS


---

## 📋 Features

- Register a user with login credentials
- Submit contact information
- Register a vehicle with VIN and license plate
- Record a service performed, cost, mileage, and future service date
- Frontend form validation
- Responsive UI with smooth animations
- Backend validation and database storage

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/vehicle-registration-system.git
cd vehicle-registration-system
```

### 2. Install Dependencies

```bash
npm install express mysql2
```

### 3. Configure MySQL Database

1. Create a MySQL database and user.
2. Use the following schema (adjust if needed):

```sql
-- Create tables based on your existing structure (example snippet)
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME
);

-- Add vehicles, contacts, services (as seen in your provided schema screenshots)
```

3. Update database credentials in `server.js`:

```js
const db = await mysql.createConnection({
    host: 'localhost',
    user: 'your_db_user',
    password: 'your_db_password',
    database: 'your_db_name'
});
```

### 4. Run the Server

```bash
node server.js
```

The server will run on [http://localhost:3000](http://localhost:3000)

---

## 🔧 Development Notes

- Make sure your MySQL server is running.
- The form is submitted via AJAX, so the page won't reload.
- Backend handles user and service relationships with `user_id` and `vehicle_id`.

---

## 📸 Screenshots

_(Include screenshots here if you want to showcase the UI)_

---

## 📄 License

MIT License. Free for personal and commercial use.

---

## 👨‍💻 Author

Made with ❤️ by Toshani



