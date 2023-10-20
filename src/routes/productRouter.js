const router = require("express").Router();
const ProductController = require("../controlleres/productControllers");

router.post("/", ProductController.addProduct);
router.get("/", ProductController.getAllProduct);
router.get("/:id", ProductController.getProductId);
router.delete("/:id", ProductController.deleteProduct);
router.put("/:id", ProductController.updateProduct);

module.exports = router;
