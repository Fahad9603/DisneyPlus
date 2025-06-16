import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  uid: '',
  name: '',
  email: '',
  photo: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserLogin: (state, action) => {
      state.uid = action.payload.uid;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.photo = action.payload.photo;
    },
    setSignOut: (state) => {
      state.uid = '';
      state.name = '';
      state.email = '';
      state.photo = '';
    },
  },
});

export const { setUserLogin, setSignOut } = userSlice.actions;

export const selectUserEmail = (state) => state.user.email;
export const selectUserUID = (state) => state.user.uid;
export default userSlice.reducer;
