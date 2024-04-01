import { createSlice } from "@reduxjs/toolkit"


const userSlise=createSlice({
    name : 'user',
    initialState: [null, null],
    reducers:{
        setUserLocation(state, action) {
            const [latitude, longitude] = action.payload;
      
            // Return a new state object with updated data
            return [latitude, longitude];
          },
        showLoaction(state){
            console.log(state)
        }
    }
})
export const { setUserLocation,showLoaction } = userSlise.actions;
export default userSlise.reducer;