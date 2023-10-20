const Review_commentsController = require("../controlleres/review_commentControllers");
const middlewareController = require("../controlleres/midlewareController");
const router = require("express").Router();

router.post(
  "/",
  //   middlewareController.verifyToken,
  Review_commentsController.addReview
);

router.get("/", Review_commentsController.getAllReview);

router.delete("/:id", Review_commentsController.deleteReview);

module.exports = router;
