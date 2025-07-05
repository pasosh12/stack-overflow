import {configureStore} from "@reduxjs/toolkit";
import {baseApi} from "@/shared/api/base-api";
import {appReducer, appSlice} from "@/app/app-slice";

export const store = configureStore({
    reducer:{
        [appSlice.name]: appReducer,
        [baseApi.reducerPath]: baseApi.reducer
    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch