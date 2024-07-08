import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateprofile, getprofile } from "../profileSlice";
import { ProfileForm } from "../../../components/ProfileForm";
import { Loader } from "../../../components/Loader";

export const Profile = () => {
  const { loading, user } = useSelector(state => state.profile);
  const { token } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getprofile(token));
  }, [token, dispatch]);

  return <>{loading ? <Loader /> : <ProfileForm initialState={{ ...user, password: "" }} actionCreatorProfileUpdate={updateprofile} buttonText="Update Profile" />}</>;
};
