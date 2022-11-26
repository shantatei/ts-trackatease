import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface MarkerState {
    longitude: number;
    latitude: number;
}

const initialState: MarkerState = {
    longitude: 103.94247239896549,
    latitude: 1.3540939962173724,
}

export const markerSlice = createSlice({
    name: 'marker',
    initialState,
    reducers: {
        SetMarker: (state, action: PayloadAction<MarkerState>) => {
            state.longitude = action.payload.longitude;
            state.latitude = action.payload.latitude;
        },
        ResetMarker: (state) => {
            state.longitude = 103.94247239896549;
            state.latitude = 1.3540939962173724;
        },
    },
})

// Action creators are generated for each case reducer function
export const { SetMarker, ResetMarker } = markerSlice.actions

export default markerSlice.reducer