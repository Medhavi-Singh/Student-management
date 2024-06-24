import { createSlice } from "@reduxjs/toolkit";
// const data = [];
const usersSlice = createSlice({
    name: 'users',
    initialState:{
        data:[],
    },
    reducers:{
        addUser: (state,action)=>{
            state.data.push(action.payload);
        },
        updateUser: (state,action)=>{
            state.data[action.payload.index]=action.payload.user;
        },
        deleteUser:(state,action)=>{
            // method 1
            // state.data.splice(state.data.findIndex((dt) => dt.id === action.payload), 1);
            //method 2
            state.data.splice(action.payload,1);
            
        },
    }
});

export const{addUser,deleteUser,updateUser} = usersSlice.actions;

export default usersSlice.reducer;