const jwt = require("jsonwebtoken")

const middlewareController = {
    // xac nhan token
    verifyToken: (req, res, next) => {
        const token = req.headers.token
        if (token) {
            const accessToken = token.split(" ")[1]
            jwt.verify(accessToken, process.env.ACCESS_KEY, (err, user) => {
                if (err) {
                    return res.status(403).json("Token không hợp lệ!")
                }
                req.user = user
                next()
            })
        }
        else {
            return res.status(401).json("Bạn cần đăng nhập!")
        }
    },

    verifyTokenAdmin: (req, res, next) => {
        middlewareController.verifyToken(req, res, () => {
            if(req.user.id != req.params.id && req.user.admin) {
                next()
            }
            else{
                return res.status(403).json("Không thể xóa chính mình!")
            }
        })
    }
}
module.exports = middlewareController