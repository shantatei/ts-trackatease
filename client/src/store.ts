import { configureStore } from '@reduxjs/toolkit'
import markerReducer from './redux/markerSlice'

export const store = configureStore({
    reducer: {
        marker: markerReducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch