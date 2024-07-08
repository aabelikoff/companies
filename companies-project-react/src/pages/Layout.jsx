import React, { useEffect } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StyledContainer } from "../styledComponents/StyledContainer";
import { StyledContentContainer } from "../styledComponents/StyledLayout";

export const Layout = () => {
  return (
    <StyledContainer>
      <Header />
      <StyledContentContainer>
        <Outlet />
      </StyledContentContainer>
      <Footer />
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </StyledContainer>
  );
};
