import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "@/features/api/apiSlice";

// Create empty reducers for the other slices since they're referenced but not implemented
const authReducer = (state = {}, action: any) => state;
const postsReducer = (state = {}, action: any) => state;
const usersReducer = (state = {}, action: any) => state;
const notificationsReducer = (state = {}, action: any) => state;

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    users: usersReducer,
    notifications: notificationsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
