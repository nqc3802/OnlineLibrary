const middlewareController = require("../controllers/middlewareController");
const userController = require("../controllers/userController")

const router = require("express").Router()

// hien tat ca nguoi dung
router.get("/list", middlewareController.verifyTokenAdmin, userController.getAllUsers)

// 
router.get("/view/:id", middlewareController.verifyTokenAdmin, userController.getUser)

// xoa user
router.delete("/:id", middlewareController.verifyTokenAdmin, userController.deleteUser)

module.exports = router;
