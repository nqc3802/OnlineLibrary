const User = require("../models/User");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const mysql = require('mysql2');

// kết nối tới mysql
const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'chinh238',
    database: 'jdbc_demo',
});
mysqlConnection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL');
    }
});

let refreshTokens = []
const authController = {
    // đăng ký(REGISTER)
    registerUser: async (req, res) => {
        try {
            // hash password
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);

            // tạo user mới
            const newUser = await new User({
                username: req.body.username,
                email: req.body.email,
                password: hashed,
            });

            // lưu vào db
            const user = await newUser.save();
            // const { _id, username } = user;
            // const userId = _id.toString();

            // Copy id và username vào mysql
            const query = "INSERT INTO `jdbc_demo`.`id_user` (`userID`, `username`) VALUES (?, ?)";
            mysqlConnection.query(query, [user.id, user.username], (error, results) => {
                if (error) {
                    console.error('Error copying user to MySQL:', error);
                    return res.status(500).json('Internal Server Error');
                }
                console.log('User copied to MySQL');
            });
            return res.status(200).json(user);
        } catch (err) {
            console.error('Error registering user:', err);
            return res.status(500).json(err);
        }
    },

    // tao access token
    generateAccessToken: (user) => {
        return jwt.sign({
            id: user.id,
            admin: user.admin,
        },
            process.env.ACCESS_KEY,
            { expiresIn: "60s" }
        )
    },

    // tao refresh token
    generateRefreshToken: (user) => {
        return jwt.sign({
            id: user.id,
            admin: user.admin,
        },
            process.env.REFRESH_KEY,
            { expiresIn: "30d" }
        )
    },

    // login
    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({ username: req.body.username });
            if (!user) {
                return res.status(404).json("Sai tên đăng nhập");
            }
            const validPassword = await bcrypt.compare( // so sánh hash password
                req.body.password, // user nhập
                user.password // db
            );
            if (!validPassword) {
                return res.status(404).json("Sai mật khẩu");
            }
            if (user && validPassword) {
                const accessToken = authController.generateAccessToken(user)
                const refreshToken = authController.generateRefreshToken(user)
                refreshTokens.push(refreshToken)
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true, // httpOnly ít bị ảnh hưởng xss
                    secure: false,
                    path: "/",
                    sameSite: "strict", // ngăn chặn csrf
                })
                const { password, ...others } = user._doc;
                return res.status(200).json({ ...others, accessToken });
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    requestRefreshToken: async (req, res) => {
        // lay refresh token tu user
        const refreshToken = req.cookies.refreshToken
        if (!refreshToken) {
            return res.status(401).json("Bạn cần đăng nhập!")
        }
        if (!refreshTokens.includes(refreshToken)) {
            return res.status(403).json("Token không hợp lệ!")
        }
        jwt.verify(refreshToken, process.env.REFRESH_KEY, (err, user) => {
            if (err) {
                console.log(err)
            }
            // tạo 1 mảng mới chứa các phần tử của mảng ban đầu trừ phần tử có giá trị bằng refreshToken
            refreshTokens = refreshTokens.filter((token) => token !== refreshToken)
            // tao 2 token moi
            const newAccessToken = authController.generateAccessToken(user)
            const newRefreshToken = authController.generateRefreshToken(user)
            // thêm refreshToken mới vào mảng
            refreshTokens.push(newRefreshToken)
            res.cookie("refreshToken", newRefreshToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict",
            })
            return res.status(200).json({ accessToken: newAccessToken })
        })
    },
    // logout
    userLogout: async (req, res) => {
        res.clearCookie("refreshToken")
        refreshTokens = refreshTokens.filter(
            (token) => token !== req.cookies.refreshToken
        )
        return res.status(200).json("Đăng xuất thành công!")
    }
}

module.exports = authController;