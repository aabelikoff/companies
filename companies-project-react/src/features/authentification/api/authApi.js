import axios from "axios";
import { AUTH_API_URL } from "../../../constants";

const api = axios.create({
  baseURL: AUTH_API_URL,
});

export const signUpApi = userData => api.post("/signup", userData);
export const loginApi = credentials => api.post("/signin", credentials);
