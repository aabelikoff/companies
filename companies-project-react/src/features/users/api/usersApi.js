import axios from "axios";
import { USERS_API_URL } from "../../../constants";

export const fetchUsers = token => {
  return axios.get(USERS_API_URL, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchUser = (token, id) => {
  return axios.get(`${USERS_API_URL}/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createUser = (token, userData) => {
  return axios.post(USERS_API_URL, userData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateUser = (token, id, userData) => {
  return axios.patch(`${USERS_API_URL}/${id}`, userData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteUser = (token, id) => {
  return axios.delete(`${USERS_API_URL}/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
