import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface TrackerState {
    deviceid: string;
    long: number;
    lat: number;
    timestamp: number;
}


const initialState: TrackerState = {
    deviceid: "",
    long: 103.94136894924048,
    lat: 1.354119067616665,
    timestamp: Date.now(),
}

export const trackerSlice = createSlice({
    name: 'tracker',
    initialState,
    reducers: {
        SetTracker: (state, action: PayloadAction<TrackerState>) => {
            console.log(action.payload);
            state.deviceid = action.payload.deviceid
            state.long = action.payload.long;
            state.lat = action.payload.lat;
            state.timestamp = action.payload.timestamp;
        },
        ResetTracker: (state) => {
            state.deviceid = "";
            state.long = 103.94136894924048;
            state.lat = 1.354119067616665;
            state.timestamp = Date.now();
        },
    },
})

// Action creators are generated for each case reducer function
export const { SetTracker, ResetTracker } = trackerSlice.actions

export default trackerSlice.reducer