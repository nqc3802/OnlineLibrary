import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/apiRequest";
import { createAxios } from "../../createInstance";
import { logoutSuccess } from "../../redux/authSlice";
const NavBar = () => {
  const user = useSelector((state) => state.auth.login?.currentUser)
  const admin = useSelector((state) => state.auth.login?.admin)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const accessToken = user?.accessToken
  const id = user?._id
  let axiosJWT = createAxios(user, dispatch, logoutSuccess)

  const handleLogout = () => {
    logOut(dispatch, id, navigate, accessToken, axiosJWT)
  }
  return (
    <nav className="navbar-container">
      <Link to="/" className="navbar-home">Trang chủ</Link>
      {user ? (
        <>
          {admin ? (
            <>
              <Link to="/admin/books" className="navbar-home">Quản lý sách</Link>
            </>
          ) : (<></>)
          }
          <Link to="/cart" className="navbar-home">
            Giỏ hàng{" "}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-plus-fill" viewBox="0 0 16 16">
              <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0z" />
            </svg>
          </Link>
          <Link to="/shopping" className="navbar-home">Đơn hàng</Link>
          <p className="navbar-user">Xin chào, <span> {user.username} </span> </p>
          <Link to="/logout" className="navbar-logout" onClick={handleLogout}>Đăng xuất</Link>
        </>
      ) : (
        <>
          <Link to="/login" className="navbar-login">Đăng nhập</Link>
          <Link to="/register" className="navbar-register">Đăng ký</Link>
        </>
      )}
    </nav>
  );
};

export default NavBar;
