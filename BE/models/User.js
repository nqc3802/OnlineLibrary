const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true, // không nhập dữ liệu trả về lỗi
        minlength: 6,
        maxlength: 15,
        unique: true // kiểm tra trùng username
    },
    email: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 40,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    admin: {
        type: Boolean, // kiểm tra có phải admin không
        default: false, // mặc định không phải admin
    },
},
    {
        timestamps: true /* kiểm tra user đc tạo/update khi nào*/
    }
);

module.exports = mongoose.model("User", userSchema);