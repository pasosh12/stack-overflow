import {configureStore} from "@reduxjs/toolkit";
import {baseApi} from "../shared/api/baseApi.ts";

export const store = configureStore({
    reducer:{
        [baseApi.reducerPath]: baseApi.reducer
    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware)
})
