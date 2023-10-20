const { initModels } = require("../models/init-models");
const sequelize = require("../connect/sequelize");
const { v4: uuidv4 } = require("uuid");

const PromotionController = {
  addPromotion: async (req, res) => {
    const { Promotions } = initModels(sequelize);
    const id = uuidv4();
    try {
      console.log(1);
      const newPromotion = await Promotions.create({ id, ...req.body });
      console.log(2);
      res.status(200).json(newPromotion);
    } catch (error) {
      res.status(500).json(200);
    }
  },
  getAllPromotion: async (req, res) => {
    const { Promotions } = initModels(sequelize);
    try {
      const promotions = await Promotions.findAll();
      res.status(200).json(promotions);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getPromotionId: async (req, res) => {
    const { Promotions } = initModels(sequelize);
    try {
      const promotion = await Promotions.findByPk(req.params.id);
      res.status(200).json(promotion);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deletePromotion: async (req, res) => {
    const { Promotions } = initModels(sequelize);
    try {
      await Promotions.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({ message: "Xóa thafh công promotion" });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updatePromotion: async (req, res) => {
    const { Promotions } = initModels(sequelize);
    const promotionId = req.params.id;
    try {
      const promotion = await Promotions.findByPk(promotionId);
      if (promotion) {
        await Promotions.update(req.body, {
          where: {
            id: promotionId,
          },
        });
      }
      const updatePromotion = await Promotions.findByPk(req.params.id);
      res.status(200).json(updatePromotion);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = PromotionController;
