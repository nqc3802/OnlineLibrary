const User = require("../models/User");
const mysql = require("mysql2");

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
})

const userController = {
    // hien tat ca user 
    getAllUsers: async (req, res) => {
        try {
            const user = await User.find()
            return res.status(200).json(user)
        } catch (err) {
            return res.status(500).json(err)
        }
    },

    // hien thi thong tin 1 nguoi dung
    getUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id)
            return res.status(200).json(user)
        } catch (err) {
            return res.status(500).json(err)
        }
    },

    // xoa user
    deleteUser: async (req, res) => {
        try {
            const user = await User.findByIdAndDelete(req.params.id)
            // const user = await User.findById(req.params.id)

            const query = "DELETE FROM `jdbc_demo`.`id_user` WHERE userID = ?;";
            mysqlConnection.query(query, [req.params.id], (error, results) => {
                if (error) {
                    console.error('Error copying user to MySQL:', error);
                    return res.status(500).json('Internal Server Error');
                }
                console.log('User copied to MySQL');
            });

            return res.status(200).json("Xóa người dùng thành công")
        } catch (err) {
            console.error('Error registering user:', err);
            return res.status(500).json(err)
        }
    }
}

module.exports = userController