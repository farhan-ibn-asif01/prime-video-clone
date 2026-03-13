import axios from 'axios';
import { hashPassword, comparePassword } from '../utils/auth';

const AUTH_URL = 'http://localhost:5000';

export interface User {
  id?: number;
  email: string;
  password: string;
  name: string;
}

export const signup = async (name: string, email: string, password: string): Promise<User> => {
  const usersResponse = await axios.get(`${AUTH_URL}/users?email=${email}`);
  
  if (usersResponse.data.length > 0) {
    throw new Error('Email already exists');
  }

  const hashedPassword = await hashPassword(password);
  
  const response = await axios.post(`${AUTH_URL}/users`, {
    name,
    email,
    password: hashedPassword
  });
  
  return response.data;
};

export const login = async (email: string, password: string): Promise<User> => {
  const response = await axios.get(`${AUTH_URL}/users?email=${email}`);
  
  if (response.data.length === 0) {
    throw new Error('Invalid email or password');
  }

  const user = response.data[0];
  const isValid = await comparePassword(password, user.password);
  
  if (!isValid) {
    throw new Error('Invalid email or password');
  }

  return user;
};

export const getUserByEmail = async (email: string): Promise<User> => {
  const response = await axios.get(`${AUTH_URL}/users?email=${email}`);
  
  if (response.data.length === 0) {
    throw new Error('User not found');
  }

  return response.data[0];
};
