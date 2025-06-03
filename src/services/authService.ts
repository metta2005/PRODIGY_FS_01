import { User } from '../types';

// This is a mock auth service that uses localStorage for demonstration purposes
// In a real application, you would use actual API calls to a backend server

const STORAGE_KEY = 'auth_user';
const USERS_KEY = 'auth_users';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
  async login(email: string, password: string, remember: boolean): Promise<User> {
    await delay(1000); // Simulate API call
    
    const usersJson = localStorage.getItem(USERS_KEY);
    const users: Record<string, User & { password: string }> = usersJson ? JSON.parse(usersJson) : {};
    
    const user = Object.values(users).find(u => u.email === email);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    if (user.password !== password) {
      throw new Error('Invalid password');
    }
    
    // Remove password from user object before storing in session
    const { password: _, ...userWithoutPassword } = user;
    
    if (remember) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userWithoutPassword));
    } else {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(userWithoutPassword));
    }
    
    return userWithoutPassword;
  },
  
  async register(email: string, password: string, name: string): Promise<User> {
    await delay(1000); // Simulate API call
    
    const usersJson = localStorage.getItem(USERS_KEY);
    const users: Record<string, User & { password: string }> = usersJson ? JSON.parse(usersJson) : {};
    
    if (Object.values(users).some(u => u.email === email)) {
      throw new Error('Email already in use');
    }
    
    const newUser = {
      id: Date.now().toString(),
      email,
      name,
      password,
      createdAt: new Date().toISOString(),
    };
    
    // Save user to "database"
    users[newUser.id] = newUser;
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    
    // Remove password from user object before returning
    const { password: _, ...userWithoutPassword } = newUser;
    
    // Save to session
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(userWithoutPassword));
    
    return userWithoutPassword;
  },
  
  async getCurrentUser(): Promise<User> {
    // Check sessionStorage first, then localStorage
    const userJson = sessionStorage.getItem(STORAGE_KEY) || localStorage.getItem(STORAGE_KEY);
    
    if (!userJson) {
      throw new Error('No user found');
    }
    
    return JSON.parse(userJson);
  },
  
  logout(): void {
    sessionStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_KEY);
  },
  
  async resetPassword(email: string): Promise<void> {
    await delay(1000); // Simulate API call
    
    const usersJson = localStorage.getItem(USERS_KEY);
    const users: Record<string, User & { password: string }> = usersJson ? JSON.parse(usersJson) : {};
    
    const user = Object.values(users).find(u => u.email === email);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    // In a real app, this would send a reset email
    // For this demo, we'll just console log
    console.log(`Password reset requested for ${email}`);
  }
};