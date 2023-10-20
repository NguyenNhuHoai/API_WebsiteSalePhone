const router = require("express").Router();
const RoleController = require("../controlleres/roleController");

router.post("/", RoleController.addRole);
router.delete("/:id", RoleController.deleRole);
router.get("/:id", RoleController.getRoleId);
router.get("/", RoleController.getAllRoles);
router.put("/:id", RoleController.updateRole);

module.exports = router;
