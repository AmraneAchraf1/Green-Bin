import { configureStore  } from "@reduxjs/toolkit";
import TestSlice from "./reducer/TestSlice";
import binSlice from "./reducer/ui/binSlice";
import userSlise from "./reducer/ui/userSlise";
import userInformationSlice from "./reducer/ui/userInformationSlice";

const store = configureStore({
    reducer: {
        test: TestSlice,
        bins: binSlice,
        user: userSlise,
        userInfo: userInformationSlice,
    }
});

export default store;
