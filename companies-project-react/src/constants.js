export const API_BASE_URL = "http://localhost:5000";
export const COMPANIES_API_URL = `${API_BASE_URL}/companies`;
export const AUTH_API_URL = `${API_BASE_URL}/auth`;
export const AUTH_PROFILE_API_URL = `${AUTH_API_URL}/profile`;
export const USERS_API_URL = `${API_BASE_URL}/users`;

export const INPUT_PATTERNS = {
  phone: "^\\+?\\d{10,12}$",
  numberOfEmployees: "\\d+",
};
