import axios from 'axios'
import { loginFailed, loginStart, loginSuccess, logoutFailed, logoutStart, logoutSuccess, registerFailed, registerStart, registerSuccess } from './authSlice'
import { deleteUsersFailed, deleteUsersStart, deleteUsersSuccess, getUsersFailed, getUsersStart, getUsersSuccess, getUserFailed, getUserStart, getUserSuccess } from './userSlice'

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart())
    try {
        const res = await axios.post("/v1/auth/login", user)
        dispatch(loginSuccess(res.data))
        navigate("/")
    } catch (err) {
        dispatch(loginFailed())
        alert("Sai tên đăng nhập hoặc mật khẩu")
    }
}

export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart())
    try {
        await axios.post("/v1/auth/register", user)
        dispatch(registerSuccess())
        navigate("/login")
    }
    catch (err) {
        dispatch(registerFailed())
        alert("Tên người dùng hoặc email đã được sử dụng")
    }
}

export const getAllUsers = async (accessToken, dispatch, axiosJWT) => {
    dispatch(getUsersStart())
    try {
        const res = await axiosJWT.get("/v1/user/list", {
            headers: { token: `Bearer ${accessToken}` }
        })
        dispatch(getUsersSuccess(res.data))
    } catch (err) {
        dispatch(getUsersFailed())
    }
}

export const getUser = async (accessToken, dispatch, id, axiosJWT) => {
    dispatch(getUserStart())
    try {
        const res = await axiosJWT.get("/v1/user/view/" + id, {
            headers: { token: `Bearer ${accessToken}` }
        })
        dispatch(getUserSuccess(res.data))
    } catch (err) {
        dispatch(getUserFailed())
    }
}

export const deleteUser = async (accessToken, dispatch, id, axiosJWT) => {
    dispatch(deleteUsersStart())
    try {
        const res = await axiosJWT.delete("/v1/user/" + id, {
            headers: { token: `Bearer ${accessToken}` },
        })
        dispatch(deleteUsersSuccess(res.data))
    } catch (err) {
        dispatch(deleteUsersFailed(err.response.data))
    }
}

export const logOut = async (dispatch, id, navigate, accessToken, axiosJWT) => {
    dispatch(logoutStart())
    try {
        await axiosJWT.post("/v1/auth/logout", id, {
            headers: { token: `Bearer ${accessToken}` }
        })
        dispatch(logoutSuccess())
        navigate("/")
    } catch (err) {
        dispatch(logoutFailed())
    }
}