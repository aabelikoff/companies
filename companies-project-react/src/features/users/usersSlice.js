import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUsers, fetchUser, createUser, updateUser, deleteUser } from "./api/usersApi";
import { logout } from "../authentification/authSlice";
import { toast } from "react-toastify";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    loading: false,
    users: [],
    error: null,
  },
  reducers: {
    reset: state => {
      state.loading = false;
      state.users = [];
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(getUsers.pending, state => {
      state.loading = true;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.users.push(action.payload);
    });
    builder.addCase(editUser.fulfilled, (state, action) => {
      const index = state.users.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    });
    builder.addCase(removeUser.fulfilled, (state, action) => {
      state.users = state.users.filter(users => users.id !== action.payload);
    });
    builder.addCase(logout, (state, action) => {
      state.loading = false;
      state.error = false;
      state.users = [];
    });
  },
});

export const getUsers = createAsyncThunk("users/getUsers", async (token, { rejectWithValue }) => {
  try {
    const response = await fetchUsers(token);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    toast.error(errorMessage);
    return rejectWithValue(errorMessage);
  }
});

export const getUser = createAsyncThunk("users/getUser", async ({ token, id }, { rejectWithValue }) => {
  try {
    const response = await fetchUser(token, id);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    toast.error(errorMessage);
    return rejectWithValue(errorMessage);
  }
});

export const addUser = createAsyncThunk("users/createUser", async ({ token, userData }, { rejectWithValue }) => {
  try {
    const response = await createUser(token, userData);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    toast.error(errorMessage);
    return rejectWithValue(errorMessage);
  }
});

export const editUser = createAsyncThunk("users/editUser", async ({ token, id, userData }, { rejectWithValue }) => {
  try {
    const response = await updateUser(token, id, userData);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    toast.error(errorMessage);
    return rejectWithValue(errorMessage);
  }
});

export const removeUser = createAsyncThunk("users/removeUser", async ({ token, id }, { rejectWithValue }) => {
  try {
    const response = await deleteUser(token, id);
    toast.info(response.data.message);
    return id;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    toast.error(errorMessage);
    return rejectWithValue(errorMessage);
  }
});

export default usersSlice.reducer;
export const { reset } = usersSlice.actions;
