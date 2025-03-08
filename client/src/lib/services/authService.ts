import axios from "axios";

interface SignUpSchema {
  name: string;
  email: string;
  password: string;
}

interface SignInSchema {
  email: string;
  password: string;
}

export const signUpService = async (data: SignUpSchema) => {
  return await axios.post(`${process.env.NEXT_PUBLIC_API_URI}/signup`, data);
}

export const signInService = async (data: SignInSchema) => {
  return await axios.post(`${process.env.NEXT_PUBLIC_API_URI}/signin`, data, { withCredentials: true });
}

