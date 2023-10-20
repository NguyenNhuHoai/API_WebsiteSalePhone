const route = require("express").Router();
const PromotionController = require("../controlleres/promotionsControllers");

route.post("/", PromotionController.addPromotion);
route.get("/", PromotionController.getAllPromotion);
route.get("/:id", PromotionController.getPromotionId);
route.delete("/:id", PromotionController.deletePromotion);
route.put("/:id", PromotionController.updatePromotion);

module.exports = route;
