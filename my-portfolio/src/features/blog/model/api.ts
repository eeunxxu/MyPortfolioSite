import axios from 'axios';
// import axiosInstance from '@/app/api/axiosInstance';
import { LoginPayload } from './type';

// 로그인

export const login = async ({ email, password }: LoginPayload) => {
  const loginData = {
    email,
    password,
  };
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_LOCAL_API_BASE_URL}/login`,
      loginData,
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('로그인 성공', res.data);
    return res;
  } catch (err) {
    console.error('로그인 실패:', err);
    throw err;
  }
};
