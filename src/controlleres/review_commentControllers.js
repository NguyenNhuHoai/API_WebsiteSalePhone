const { initModels } = require("../models/init-models");
const sequelize = require("../connect/sequelize");
const { v4: uuidv4 } = require("uuid");

const Review_commentsController = {
  addReview: async (req, res) => {
    const { Review_comments } = initModels(sequelize);
    try {
      const newRVCM = await Review_comments.create(req.body);
      res.status(200).json(newRVCM);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAllReview: async (req, res) => {
    const { Review_comments } = initModels(sequelize);
    try {
      const reviews = await Review_comments.findAll();
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteReview: async (req, res) => {
    const { Review_comments } = initModels(sequelize);
    try {
      await Review_comments.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json("xóa thành công");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = Review_commentsController;
