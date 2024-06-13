import { useEffect, useState } from "react";
import "./register.css";
import { registerUser } from "../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Register = () => {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state) => state.auth.login?.currentUser)
    const admin = useSelector((state) => state.auth.login?.admin)

    const handleRegister = (e) => {
        e.preventDefault()
        const newUser = {
            email: email,
            password: password,
            username: username,
        }
        registerUser(newUser, dispatch, navigate)
    }

    useEffect(() => {
        if (user || admin) {
            navigate("/")
        }
    }, [])

    return (
        <section className="register-container">
            <div className="register-title"> Đăng ký </div>
            <form onSubmit={handleRegister}>
                <label>Email</label>
                <input type="text" placeholder="Nhập email của bạn" onChange={(e) => setEmail(e.target.value)} />
                <p class="register">- Email phải dài từ 10 đến 40 ký tự</p>

                <label>Tài khoản</label>
                <input type="text" placeholder="Tên đăng nhập" onChange={(e) => setUsername(e.target.value)} />
                <p class="register">- Tên đăng nhập phải dài từ 6 đến 15 ký tự</p>

                <label>Mật khẩu</label>
                <input type="password" placeholder="Mật khẩu" onChange={(e) => setPassword(e.target.value)} />
                <p class="register">- Mật khẩu dài ít nhất 8 ký tự</p>

                <button type="submit" id="register"> Đăng ký </button>
            </form>
        </section>

    );
}

export default Register;