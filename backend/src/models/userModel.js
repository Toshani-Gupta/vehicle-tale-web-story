import pool from '../config/database.js';
import bcrypt from 'bcryptjs';

export class User {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
    this.contactEmail = data.contactEmail || null;
    this.phone = data.phone || null;
    this.gender = data.gender || null;
    this.needs = data.needs || null;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}

class UserModel {
  async createUser(userData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    // Handle optional fields
    const contactEmail = userData.contactEmail || null;
    const phone = userData.phone || null;
    const gender = userData.gender || null;
    const needs = userData.needs || null;

    const [result] = await pool.execute(
      'INSERT INTO users (name, email, password, contactEmail, phone, gender, needs) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [userData.name, userData.email, hashedPassword, contactEmail, phone, gender, needs]
    );
    return this.getUserById(result.insertId);
  }

  async getUserByEmail(email) {
    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0] ? new User(rows[0]) : null;
  }

  async getUserById(id) {
    const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0] ? new User(rows[0]) : null;
  }

  async updateUser(id, userData) {
    const updates = [];
    const values = [];

    Object.entries(userData).forEach(([key, value]) => {
      if (value !== undefined && key !== 'id' && key !== 'password') {
        updates.push(`${key} = ?`);
        values.push(value === undefined ? null : value);
      }
    });

    if (updates.length === 0) return null;

    values.push(id);
    await pool.execute(
      `UPDATE users SET ${updates.join(', ')} WHERE id = ?`,
      values
    );

    return this.getUserById(id);
  }

  async updatePassword(id, newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const [result] = await pool.execute(
      'UPDATE users SET password = ? WHERE id = ?',
      [hashedPassword, id]
    );
    return result.affectedRows > 0;
  }

  async verifyPassword(user, password) {
    return bcrypt.compare(password, user.password);
  }
}

export default new UserModel(); 