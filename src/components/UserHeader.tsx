/* eslint-disable @typescript-eslint/no-misused-promises */
import { useEffect, useState } from "react";
import "../main.css";
import { setUser } from "../store/userSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useUpdateProfileMutation } from "../store/api/userApiSlice";

interface IUserHeader {
  userName: string;
}

export default function UserHeader({ userName }: IUserHeader) {
  const user = useAppSelector((state) => state.user);
  const [isShowUpdateInputs, setIsShowUpdateInputs] = useState(false);
  const [updateProfile, { isLoading, isError }] = useUpdateProfileMutation();
  const dispatch = useAppDispatch();

  const toggleIsShowUpdateInputs = () => {
    setIsShowUpdateInputs(!isShowUpdateInputs);
  };

  const handleUpdateUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const dataForm = new FormData(form);
    const formJson = Object.fromEntries(dataForm.entries());
    const userPayload = {
      ...user,
      ...formJson,
    };

    await updateProfile(userPayload)
      .unwrap()
      .then(({ firstName, lastName }) => {
        userPayload.firstName = firstName;
        userPayload.lastName = lastName;
        dispatch(setUser(userPayload));
      })
      .catch((error) => {
        console.log(error);
      });

    return;
  };

  return (
    <div className="header">
      <h1>
        Welcome back
        <br />
        {userName}!
      </h1>
      <button
        className="edit-button"
        onClick={() => toggleIsShowUpdateInputs()}
      >
        Edit Name
      </button>
      {isShowUpdateInputs && (
        <form className="edit-form" onSubmit={handleUpdateUser}>
          <div className="edit-input-container">
            <div className="input-wrapper">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                name="firstName"
                defaultValue={user.firstName}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="lastName">Last Name</label>
              <input type="text" name="lastName" defaultValue={user.lastName} />
            </div>
          </div>
          <button type="submit" className={`edit-button ${isError ? "error" : ""}`}>
            {isLoading ? "...Loading" : "Submit"}
          </button>
        </form>
      )}
    </div>
  );
}
