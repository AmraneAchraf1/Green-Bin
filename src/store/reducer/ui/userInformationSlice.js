import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    token:null,
    userInfo: null,
    loading: false,
    error: null,
  };
const userInformationSlice=createSlice({
    name : 'userInfo',
    initialState,
    reducers:{
        setUser(state, action) {
            state.userInfo = action.payload;
            state.loading = false;
            state.error = null;
          },
        setToken(state,action){
            state.token = action.payload
        },
          setLoading(state, action) {
            state.loading = action.payload;
            state.error = null;
          },
          setError(state, action) {
            state.loading = false;
            state.error = action.payload;
          },
          show(state){
            console.log("data :")
            console.log(state.userInfo)
          }
    }
})
export const { setUser, setLoading, setError,setToken,show } = userInformationSlice.actions;
export default userInformationSlice.reducer;