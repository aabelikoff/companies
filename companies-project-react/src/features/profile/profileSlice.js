import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProfile, updateProfile } from "./api/profileApi";
import { logout, setToken } from "../authentification/authSlice";
import { toast } from "react-toastify";

const profile = createSlice({
  name: "profile",
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
  reducers: {
    deleteProfile: state => {
      state.profile = null;
      toast.success("Profile has been deleted successfully");
    },
  },
  extraReducers: builder => {
    builder.addCase(getprofile.pending, state => {
      state.loading = true;
    });
    builder.addCase(getprofile.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(getprofile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(updateprofile.pending, state => {
      state.loading = true;
    });
    builder.addCase(updateprofile.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(updateprofile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(logout, state => {
      state.loading = false;
      state.user = null;
    });
  },
});

export const getprofile = createAsyncThunk("profile/get", async (token, { rejectWithValue }) => {
  try {
    const response = await getProfile(token);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message || "Failed to fetch profile");
    return rejectWithValue(error.response.data);
  }
});

export const updateprofile = createAsyncThunk("profile/update", async ({ token, user }, { dispatch, rejectWithValue }) => {
  try {
    const response = await updateProfile(token, user);
    toast.success(response.data.message);
    const { user: updatedUser, access_token: updatedToken } = response.data;
    dispatch(setToken(updatedToken));
    return updatedUser;
  } catch (error) {
    toast.error(error.response.data.message || "Failed to update profile");
    return rejectWithValue(error.response.data);
  }
});

export const { deleteProfile } = profile.actions;
export default profile.reducer;
