import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    name: "",
    email: "",
    Photo: ""
}

const userSliec= createSlice({
    name: "user",
    initialState,
    reducers:{
        setUserLogin:(state,action) =>{
state.name = action.payload.name;
state.email = action.payload.email;
state.Photo = action.payload.photo;
        },
        setSignOut: (state)=>{
            state.name= null;
            state.email = null;
            state.Photo = null;


        }
    }
})

export const {setUserLogin,setSignOut} = userSliec.actions;

export const selectUserName = (state) => state.user.name;
export const selectUserEmail = (state) => state.user.email;
export const selectUserPhoto = (state) => state.user.Photo;

        


export default userSliec.reducer;