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
    // {
    //     setUser(state, action: PayloadAction<User>) {
    //         state.user = action.payload
    //         state.isAuthenticated = true
    //     },
    //     logout(state) {
    //         state.user = null
    //         state.isAuthenticated = false
    //     }
    // }
        (create) => ({
            setUser: create.reducer<{ user: User}>((state, action) => {
                state.user = action.payload.user
                state.isAuthenticated = true
            }),
            logout: create.reducer<void>((state) => {
                state.user = null
                state.isAuthenticated = false
            })
        })
})
export const  appReducer = appSlice.reducer
export const {setUser, logout} = appSlice.actions
export const {selectIsAuthenticated, selectUser} = appSlice.selectors