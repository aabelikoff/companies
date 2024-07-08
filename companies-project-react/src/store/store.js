import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authentification/authSlice";
import profileReducer from "../features/profile/profileSlice";
import companyReducer from "../features/company/companySlice";
import usersReducer from "../features/users/usersSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    company: companyReducer,
    users: usersReducer,
  },
});

export default store;
