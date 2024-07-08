import axios from "axios";
import { AUTH_PROFILE_API_URL } from "../../../constants";

export const getProfile = token =>
  axios.get(AUTH_PROFILE_API_URL, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

export const updateProfile = (token, user) =>
  axios.patch(`${AUTH_PROFILE_API_URL}/update`, user, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
