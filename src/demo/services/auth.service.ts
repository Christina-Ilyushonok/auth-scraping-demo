import axios from 'axios';
import { CONFIG } from '../config';

interface LoginResponse {
  token: string;
  [key: string]: any;
}

export async function login(): Promise<string> {
  const res = await axios.post<LoginResponse>(`${CONFIG.API_URL}/auth/login`, {
    username: CONFIG.LOGIN.username,
    password: CONFIG.LOGIN.password,
  });

  return res.data.token;
}
