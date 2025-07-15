import {User} from "@/modules/auth/model/auth-types";
import {createSlice} from "@reduxjs/toolkit";

type StateType = {
    user: User | null
    isAuthenticated: boolean
    error: string | null
    successMessage: string | null
}

const initialState: StateType = {
    user: null,
    isAuthenticated: false,
    error: null,
    successMessage: null
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    selectors: {
        selectIsAuthenticated: (state) => state.isAuthenticated,
        selectUser: (state) => state.user,
        selectAppError: (state) => state.error,
        selectAppSuccess: (state) => state.successMessage,
    },
    reducers:
        (create) => ({
            setAppErrorAC: (state, action) => {
                state.error = action.payload.error
            },
            setAppSuccessAC: create.reducer<{ successMessage: string | null }>((state, action) => {
                state.successMessage = action.payload.successMessage
            }),
            setUser: create.reducer<{ user: User }>((state, action) => {
                state.user = action.payload.user
            }),
            setLogout: create.reducer<void>((state) => {
                state.user = null
                state.isAuthenticated = false
            }),
            setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
                state.isAuthenticated = action.payload.isLoggedIn
            })
        })
})
export const appReducer = appSlice.reducer
export const {setUser, setLogout, setIsLoggedIn, setAppErrorAC, setAppSuccessAC} = appSlice.actions
export const {selectIsAuthenticated, selectUser, selectAppError, selectAppSuccess} = appSlice.selectors