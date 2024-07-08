import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCompanies, fetchCompany, updateCompany, deleteCompany, createCompany } from "./api/companyApi";
import { logout } from "../authentification/authSlice";
import { toast } from "react-toastify";

const companySlice = createSlice({
  name: "company",
  initialState: {
    loading: false,
    companies: [],
    error: null,
  },
  reducers: {
    reset: state => {
      state.loading = false;
      state.companies = [];
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(getCompanies.pending, state => {
      state.loading = true;
    });
    builder.addCase(getCompanies.fulfilled, (state, action) => {
      state.loading = false;
      state.companies = action.payload;
    });
    builder.addCase(getCompanies.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(addCompany.fulfilled, (state, action) => {
      state.companies.push(action.payload);
    });
    builder.addCase(editCompany.fulfilled, (state, action) => {
      const index = state.companies.findIndex(company => company.id === action.payload.id);
      if (index !== -1) {
        state.companies[index] = action.payload;
      }
    });
    builder.addCase(removeCompany.fulfilled, (state, action) => {
      state.companies = state.companies.filter(company => company.id !== action.payload);
    });
    builder.addCase(logout, (state, action) => {
      state.loading = false;
      state.error = false;
      state.companies = [];
    });
  },
});

export const getCompanies = createAsyncThunk("company/getCompanies", async (token, { rejectWithValue }) => {
  try {
    const response = await fetchCompanies(token);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    toast.error(errorMessage);
    return rejectWithValue(errorMessage);
  }
});

export const getCompany = createAsyncThunk("company/getCompany", async ({ token, id }, { rejectWithValue }) => {
  try {
    const response = await fetchCompany(token, id);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    toast.error(errorMessage);
    return rejectWithValue(errorMessage);
  }
});

export const addCompany = createAsyncThunk("company/createCompany", async ({ token, companyData }, { rejectWithValue }) => {
  try {
    const response = await createCompany(token, companyData);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    toast.error(errorMessage);
    return rejectWithValue(errorMessage);
  }
});

export const editCompany = createAsyncThunk("company/editCompany", async ({ token, id, companyData }, { rejectWithValue }) => {
  try {
    const response = await updateCompany(token, id, companyData);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    toast.error(errorMessage);
    return rejectWithValue(errorMessage);
  }
});

export const removeCompany = createAsyncThunk("company/removeCompany", async ({ token, id }, { rejectWithValue }) => {
  try {
    const response = await deleteCompany(token, id);
    toast.info(response.data.message);
    return id;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    toast.error(errorMessage);
    return rejectWithValue(errorMessage);
  }
});

export default companySlice.reducer;
export const { reset } = companySlice.actions;
