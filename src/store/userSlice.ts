import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IUserState {
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  token: string;
}

export interface ILoginPayload {
  email: string;
  password: string;
  token: string;
}

const initialState: IUserState = {
  username: "",
  email: "",
  firstName: "",
  lastName: "",
  token: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserState>) => {
      state.username = action.payload.email;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.firstName = action.payload.firstName || "";
      state.lastName = action.payload.lastName || "";
    },
    logout: (state) => {
      state.username = "";
      state.email = "";
      state.firstName = "";
      state.lastName = "";
      state.token = "";
    },
  },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
