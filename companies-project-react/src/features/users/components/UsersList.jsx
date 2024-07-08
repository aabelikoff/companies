import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, removeUser } from "../usersSlice";
import { useNavigate } from "react-router-dom";
import { StyledTitle } from "../../../styledComponents/StyledTitle";
import { StyledList } from "../../../styledComponents/StyledList";
import { StyledUserItem } from "../../../styledComponents/StyledListItem";
import { StyledFormButton, StyledDeleteButton, StyledUpdateButton } from "../../../styledComponents/StyledButton";
import { StyledInfoParagraph } from "../../../styledComponents/StyledParagraph";
import { Loader } from "../../../components/Loader";

export const UsersList = () => {
  const dispatch = useDispatch();
  const { loading, users, error } = useSelector(state => state.users);
  const { token } = useSelector(state => state.auth);
  const adminId = useSelector(state => state.profile.user.id);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      dispatch(getUsers(token));
    }
  }, [token, dispatch]);

  const handleDelete = id => {
    dispatch(removeUser({ token, id }));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <StyledTitle>Users List</StyledTitle>
          <StyledList $width="80%">
            {users
              .filter(u => u.id !== adminId)
              .map(u => (
                <StyledUserItem key={u.id}>
                  <div>
                    <p>
                      <strong>
                        {u.last_name} {u.first_name}
                      </strong>{" "}
                      ({u.nick_name}){" "}
                    </p>
                    <p>{u.position}</p>
                    <StyledInfoParagraph>
                      <em>{u.role}</em>
                    </StyledInfoParagraph>
                  </div>
                  <div>
                    <StyledUpdateButton onClick={() => navigate(`/userDetail/${u.id}`)}>Update</StyledUpdateButton>
                    <StyledDeleteButton onClick={() => handleDelete(u.id)}>Delete</StyledDeleteButton>
                  </div>
                </StyledUserItem>
              ))}
          </StyledList>
        </>
      )}
    </>
  );
};
