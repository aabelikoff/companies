import React from "react";
import { ProfileForm } from "../components/ProfileForm";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addUser, editUser, removeUser } from "../features/users/usersSlice";
import { StyledTitle } from "../styledComponents/StyledTitle";

export const UserDetailPage = () => {
  const { id: userId } = useParams();
  const buttonText = userId ? "Edit User" : "Create User";
  const userData = useSelector(state => state.users.users.find(u => u.id === userId));
  return (
    <div>
      {userId ? (
        <>
          <StyledTitle>Editing user</StyledTitle>
          <ProfileForm actionCreatorUpdate={editUser} userId={userId} buttonText={buttonText} initialState={userData} />
        </>
      ) : (
        <>
          <StyledTitle>Creating user</StyledTitle>
          <ProfileForm actionCreatorAdd={addUser} buttonText={buttonText} />
        </>
      )}
    </div>
  );
};
