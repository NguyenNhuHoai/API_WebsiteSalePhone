const adminController = require("../controlleres/adminController");
const middlewareController = require("../controlleres/midlewareController");

const router = require("express").Router();

router.get("/", middlewareController.verifyToken, adminController.getAllUser);

router.delete(
  "/:id",
  middlewareController.verifyTokenAndAdminAuth,
  adminController.deleteUser
);

module.exports = router;
