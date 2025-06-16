import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase'; 
export const signInUser = createAsyncThunk(
  'auth/signInUser',
  async ({ email, password }) => {
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));

    const userData = userDoc.data();
    console.log(userData)

    return {
      userName: userData?.displayName,
      userPhoto: userData?.img || '',
    };

  }
);

const initialState = {
  userName: '',
  userPhoto: '',
  loading: false,
  error: null,
  step: 1,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signOut: (state) => {
      state.userName = '';
      state.userPhoto = '';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userName = action.payload.userName;
        state.userPhoto = action.payload.userPhoto;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Sign in failed';
      });
  },
});

export const { signOut } = authSlice.actions;
export default authSlice.reducer;

