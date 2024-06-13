import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState: {
        users: {
            allUsers: null,
            isFetching: false,
            error: false
        },

        user: {
            user: null,
            isFetching: false,
            error: false
        },

        msg: "",
    },
    reducers: {
        getUsersStart: (state) => {
            state.users.isFetching = true
        },
        getUsersSuccess: (state, action) => {
            state.users.isFetching = false
            state.users.allUsers = action.payload
        },
        getUsersFailed: (state) => {
            state.users.isFetching = false
            state.users.error = true
        },

        getUserStart: (state) => {
            state.user.isFetching = true
        },
        getUserSuccess: (state, action) => {
            state.user.isFetching = false
            state.user.user = action.payload
        },
        getUserFailed: (state) => {
            state.user.isFetching = false
            state.user.error = true
        },

        deleteUsersStart: (state) => {
            state.users.isFetching = true
        },
        deleteUsersSuccess: (state, action) => {
            state.users.isFetching = false
            state.msg = action.payload
        },
        deleteUsersFailed: (state, action) => {
            state.users.isFetching = false
            state.users.error = true
            state.msg = action.payload
        }
    }
})

export const {
    getUsersStart,
    getUsersSuccess,
    getUsersFailed,
    getUserStart,
    getUserSuccess,
    getUserFailed,
    deleteUsersStart,
    deleteUsersSuccess,
    deleteUsersFailed
} = userSlice.actions

export default userSlice.reducer