import type { ISurveyDashboard } from "shared/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
interface IInitialState {
    stats: ISurveyDashboard | null;
}


const initialState: IInitialState = {
    stats: null,
};

const surveySlice = createSlice({
    name: "survey",
    initialState,
    reducers: {
        setSurveyStats: (state, action: PayloadAction<ISurveyDashboard>) => {
            state.stats = action.payload;
        },
    },
});

export const { setSurveyStats } = surveySlice.actions;
export const surveyReducer = surveySlice.reducer;