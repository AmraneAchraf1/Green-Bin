import { configureStore  } from "@reduxjs/toolkit";
import TestSlice from "./reducer/TestSlice";
import binSlice from "./reducer/ui/binSlice";
import userSlise from "./reducer/ui/userSlise";

const store = configureStore({
    reducer: {
        test: TestSlice,
        bins: binSlice,
        user: userSlise,
    }
});

export default store;
