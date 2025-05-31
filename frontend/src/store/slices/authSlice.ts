import type { DecodedToken } from "@/types";
import { decodeToken, TokenUtils } from "@/utils/tokenUtils";
import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
    user: DecodedToken;
    accessToken: string | null;
}

const initialState: IInitialState = {
    user: decodeToken(),
    accessToken: TokenUtils.getToken() || null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state.user = action.payload?.user;
            state.accessToken = action.payload?.accessToken;
            TokenUtils.setToken(action.payload?.accessToken)
        },
        logout: (state) => {
            state.user = { id: "", username: "" };
            state.accessToken = null;
            TokenUtils.removeToken();
            window.location.href = '/auth';
        }
    }
});

export const { setAuth, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
