import { createSlice } from "@reduxjs/toolkit";


const binSlice=createSlice({
    name : 'bins',
    initialState:{
        data:[],
    },
    reducers:{
            resetUserBins:(state,action) => {
                state.data=action.payload;
            },
            updateUser:(state,action)=>{
                state.userLocation = action.payload
            },

    }
})
export const {resetUserBins,updateUser} = binSlice.actions;
export default binSlice.reducer;