const CategoryController = require("../controlleres/categoryControllers");

const router = require("express").Router();

// Add router
router.post("/", CategoryController.addCategory);
router.delete("/:id", CategoryController.deleteCategorty);
router.get("/:id", CategoryController.getCatagoryId);
router.get("/", CategoryController.getAllCategory);
router.put("/:id", CategoryController.updateCategory);

module.exports = router;
