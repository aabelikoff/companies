import axios from "axios";
import { COMPANIES_API_URL } from "../../../constants";

export const fetchCompanies = token => {
  return axios.get(COMPANIES_API_URL, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchCompany = (token, id) => {
  return axios.get(`${COMPANIES_API_URL}/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createCompany = (token, companyData) => {
  return axios.post(COMPANIES_API_URL, companyData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateCompany = (token, id, companyData) => {
  return axios.patch(`${COMPANIES_API_URL}/${id}`, companyData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteCompany = (token, id) => {
  return axios.delete(`${COMPANIES_API_URL}/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
