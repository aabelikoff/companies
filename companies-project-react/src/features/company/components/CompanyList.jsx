import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCompanies, removeCompany } from "../companySlice";
import { useNavigate } from "react-router-dom";
import { StyledTitle } from "../../../styledComponents/StyledTitle";
import { StyledFormButton, StyledDeleteButton, StyledUpdateButton } from "../../../styledComponents/StyledButton";
import { StyledList } from "../../../styledComponents/StyledList";
import { StyledUserItem } from "../../../styledComponents/StyledListItem";
import { StyledInfoParagraph } from "../../../styledComponents/StyledParagraph";
import { Loader } from "../../../components/Loader";
import { StyledFormItem } from "../../../styledComponents/StyledForm";
import { useTheme } from "styled-components";

export const CompanyList = () => {
  const dispatch = useDispatch();
  const { loading: companyLoading, companies, error } = useSelector(state => state.company);
  const { token, role } = useSelector(state => state.auth);
  const { users, loading: usersLoading } = useSelector(state => state.users);
  const userId = useSelector(state => state.profile?.user?.id);
  const navigate = useNavigate();
  const [isOnlyAdminCompanies, setIsOnlyAdminCompanies] = useState(false);
  const theme = useTheme();

  const loading = companyLoading || usersLoading;

  const companiesToShow = () => {
    if (!userId || role !== "admin" || !isOnlyAdminCompanies) {
      return companies;
    }
    return companies.filter(c => c.ownerId === userId);
  };

  useEffect(() => {
    if (token) {
      dispatch(getCompanies(token));
    }
  }, [token, dispatch]);

  const handleDelete = id => {
    dispatch(removeCompany({ token, id }));
  };

  const findUserName = userId => {
    const user = users.find(u => u.id === userId);
    return user ? user.nick_name : "N/A";
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <StyledTitle>CompanyList</StyledTitle>
          {role === "admin" && (
            <StyledFormItem $marginBottom $labelColor={theme.colors.dark}>
              <input type="checkbox" value={""} name="onlyAdminCompanies" id="onlyAdminCompanies" onChange={e => setIsOnlyAdminCompanies(e.target.checked)} />
              <label htmlFor="onlyAdminCompanies">show only my companies</label>
            </StyledFormItem>
          )}

          <StyledList $width="80%">
            {companiesToShow().map(c => (
              <StyledUserItem key={c.id}>
                <div>
                  <p>
                    <strong>{c.name}</strong>
                  </p>
                  {role === "admin" && <StyledInfoParagraph>User: {findUserName(c.ownerId)} </StyledInfoParagraph>}
                </div>
                <div>
                  <StyledUpdateButton onClick={() => navigate(`/companyDetail/${c.id}`)}>Details</StyledUpdateButton>
                  <StyledDeleteButton onClick={() => handleDelete(c.id)}>Delete</StyledDeleteButton>
                </div>
              </StyledUserItem>
            ))}
          </StyledList>
        </>
      )}
    </>
  );
};
