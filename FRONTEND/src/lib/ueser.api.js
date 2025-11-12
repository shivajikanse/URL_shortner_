import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/auth";

export const registerUser = async (name, email, password) => {
  const { data } = await axios.post(`${API_BASE_URL}/register`, {
    name,
    email,
    password,
  });
  return data;
};

export const loginUser = async (email, password) => {
  const { data } = await axios.post(`${API_BASE_URL}/login`, {
    email,
    password,
  });
  return data;
};
