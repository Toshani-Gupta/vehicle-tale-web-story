import pool from '../config/database';
import bcrypt from 'bcryptjs';

export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  contactEmail?: string;
  phone?: string;
  gender?: string;
  needs?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

class UserModel {
  async createUser(userData: User): Promise<User> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const [result] = await pool.execute(
      'INSERT INTO users (name, email, password, contactEmail, phone, gender, needs) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [userData.name, userData.email, hashedPassword, userData.contactEmail, userData.phone, userData.gender, userData.needs]
    );
    return this.getUserById((result as any).insertId);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    return (rows as User[])[0] || null;
  }

  async getUserById(id: number): Promise<User | null> {
    const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
    return (rows as User[])[0] || null;
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User | null> {
    const updates: string[] = [];
    const values: any[] = [];

    Object.entries(userData).forEach(([key, value]) => {
      if (value !== undefined && key !== 'id' && key !== 'password') {
        updates.push(`${key} = ?`);
        values.push(value);
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

  async updatePassword(id: number, newPassword: string): Promise<boolean> {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const [result] = await pool.execute(
      'UPDATE users SET password = ? WHERE id = ?',
      [hashedPassword, id]
    );
    return (result as any).affectedRows > 0;
  }

  async verifyPassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password);
  }
}

export default new UserModel(); 