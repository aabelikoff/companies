import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../authSlice";
import "react-toastify/dist/ReactToastify.css";
import { StyledForm, StyledFormItem } from "../../../styledComponents/StyledForm";
import { StyledFormButton } from "../../../styledComponents/StyledButton";
import { Loader } from "../../../components/Loader";
import { PasswordField } from "../../../components/PasswordField";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLogged, loading } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogged) {
      navigate("/companies");
    }
  }, [isLogged, navigate]);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <StyledForm onSubmit={handleSubmit} $maxWidth="50%">
      <StyledFormItem $inputWidth="100%">
        <input type="email" value={email} placeholder="email" onChange={e => setEmail(e.target.value)} required />
      </StyledFormItem>
      <StyledFormItem $inputWidth="100%">
        <PasswordField valueModel={password} onPasswordChange={e => setPassword(e.target.value)} required={true} placeholder={"password"} />
      </StyledFormItem>
      <StyledFormButton type="submit" $width="50%">
        Log In
      </StyledFormButton>
    </StyledForm>
  );
};
