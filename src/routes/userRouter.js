const router = require("express").Router();
const userController = require("../controlleres/userController");
const middlewareController = require("../controlleres/midlewareController");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/refeshToken", userController.requestRefreshToken);
router.post("/logout", middlewareController.verifyToken, userController.Logout);

module.exports = router;
