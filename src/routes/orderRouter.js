const router = require("express").Router();
const OrderController = require("../controlleres/orderController");

router.post("/", OrderController.addOrder);
router.delete("/:id", OrderController.deleteOrder);
router.get("/", OrderController.getAllOrder);

module.exports = router;
