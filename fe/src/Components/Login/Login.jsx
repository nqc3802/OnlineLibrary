import { useEffect, useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.login?.currentUser)
    const admin = useSelector((state) => state.auth.login?.admin)
    
    const handleLogin = (e) => {
        e.preventDefault()
        const newUser = {
            username: username,
            password: password,
        }
        loginUser(newUser, dispatch, navigate)
    }

    useEffect(() => {
        if (user || admin) {
          navigate("/")
        }
      }, [])

    return (
        <section className="login-container">
            <div className="login-title"> Đăng nhập</div>
            <form onSubmit={handleLogin}>
                <label style={{color: "black"}}>Tài khoản</label>
                <input type="text" placeholder="Tên đăng nhập" onChange={(e) => setUsername(e.target.value)} />
                <br></br>
                <label style={{color: "black"}}>Mật khẩu</label>
                <input type="password" placeholder="Mật khẩu" onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" id="login"> Đăng nhập </button>
            </form>
            <div className="login-register"> Chưa có tài khoản? </div>
            <Link className="login-register-link" to="/register"> Đăng ký ngay! </Link>
        </section>
    );
}

export default Login;