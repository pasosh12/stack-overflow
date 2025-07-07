import {User} from "@/modules/auth/model/auth-types";
import {createSlice} from "@reduxjs/toolkit";

type AuthState = {
    user: User | null
    isAuthenticated: boolean
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    selectors: {
        selectIsAuthenticated: (state) => state.isAuthenticated,
        selectUser: (state) => state.user
    },
    reducers:
        (create) => ({
            setUser: create.reducer<{ user: User }>((state, action) => {
                state.user = action.payload.user
            }),
            setLogout: create.reducer<void>((state) => {
                state.user = null
                state.isAuthenticated = false
            }),
            setIsLoggedIn: create.reducer<{isLoggedIn:boolean}>((state, action) => {
                state.isAuthenticated = action.payload.isLoggedIn
            })
        })
})
export const  appReducer = appSlice.reducer
export const {setUser, setLogout, setIsLoggedIn} = appSlice.actions
export const {selectIsAuthenticated, selectUser} = appSlice.selectors