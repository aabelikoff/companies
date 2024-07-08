import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { signUpApi, loginApi } from "./api/authApi";
import { toast } from "react-toastify";

import { getUsers } from "../users/usersSlice";
import { getCompanies } from "../company/companySlice";
import { getprofile } from "../profile/profileSlice";

export const signup = createAsyncThunk("auth/signup", async (userData, { rejectWithValue }) => {
  try {
    const response = await signUpApi(userData);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    toast.error(errorMessage);
    return rejectWithValue(errorMessage);
  }
});

export const login = createAsyncThunk("auth/login", async (credentials, { dispatch, rejectWithValue }) => {
  try {
    const token = sessionStorage.getItem("companies_project_token");
    if (token) {
      dispatch(getprofile(token));
      dispatch(getCompanies(token));
      const response = await loginApi(credentials);
      const role = response.data.role;
      // Загрузить пользователей, если роль - "admin"
      if (role === "admin") {
        dispatch(getUsers(token));
      }
      toast.success(response.data.message);
      return { access_token: token, role };
    } else {
      // Если токена нет, выполняем запрос на логин
      const response = await loginApi(credentials);
      const token = response.data.access_token;
      const role = response.data.role;
      sessionStorage.setItem("companies_project_token", token);
      toast.success(response.data.message);
      dispatch(getprofile(token));
      dispatch(getCompanies(token));
      if (role === "admin") {
        dispatch(getUsers(token));
      }
      return { access_token: token, role };
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    toast.error(errorMessage);
    return rejectWithValue(errorMessage);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    token: null,
    isLogged: false,
    role: null,
  },
  reducers: {
    logout: state => {
      state.token = null;
      state.isLogged = false;
      state.loading = false;
      state.role = null;
      toast.info("Logout successful");
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(signup.pending, state => {
      state.loading = true;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.loading = false;
      state.token = null;
      state.isLogged = false;
      state.role = null;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.loading = false;
      throw new Error(action.payload); //throw exeption to avoid navigation to /login
    });
    builder.addCase(login.pending, state => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.access_token;
      state.isLogged = true;
      state.role = action.payload.role;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export const { logout, setToken } = authSlice.actions;
export default authSlice.reducer;
