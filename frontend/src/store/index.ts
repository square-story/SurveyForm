import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { surveyReducer } from "./slices/surveySlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        survey: surveyReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
