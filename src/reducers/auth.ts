import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  loading: boolean;
  error: string | null;
  user: string[];
}

const initialState: UserState = {
  loading: false,
  user: [],
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoadingUser(state) {
      state.loading = true;
    },
    resetLoggedInUser(state) {
      state.user = [];
      state.loading = false;
      state.error = null;
    },
    setLoggedInUser(state, action) {
      state.loading = false;
      state.user = action.payload;
    },
    setLoggedInUserError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  setLoadingUser,
  setLoggedInUser,
  resetLoggedInUser,
  setLoggedInUserError,
} = authSlice.actions;

export default authSlice.reducer;
