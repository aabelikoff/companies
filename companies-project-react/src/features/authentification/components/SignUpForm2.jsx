import React from "react";
import { signup } from "../authSlice";
import { ProfileForm } from "../../../components/ProfileForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from "../../../components/Loader";
import { useSelector } from "react-redux";

export const SignUpForm2 = () => {
  const { loading } = useSelector(state => state.auth);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <ProfileForm
          initialState={{
            email: "",
            password: "",
            phone_number: "",
            last_name: "",
            first_name: "",
            nick_name: "",
            description: "",
            position: "",
          }}
          actionCreatorRegister={signup}
          buttonText="Sign Up"
        />
      )}
    </>
  );
};
