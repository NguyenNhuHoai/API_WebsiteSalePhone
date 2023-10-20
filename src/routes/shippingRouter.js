const router = require("express").Router();
const shippingController = require("../controlleres/shippingController");

router.post("/", shippingController.addShipppingController);

module.exports = router;
