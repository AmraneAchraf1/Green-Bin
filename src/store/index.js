import { configureStore } from "@reduxjs/toolkit";
import TestSlice from "./reducer/TestSlice";

const store = configureStore({
    reducer: {
        test: TestSlice,
    }
});

export default store;
