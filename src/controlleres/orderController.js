const { initModels } = require("../models/init-models");
const { v4: uuidv4 } = require("uuid");
const sequelize = require("../connect/sequelize");

const OrderController = {
  addOrder: async (req, res) => {
    const { Orders } = initModels(sequelize);
    const id = uuidv4();
    try {
      const newOrder = await Orders.create({ id, ...req.body });
      res.status(200).json(newOrder);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteOrder: async (req, res) => {
    const { Orders } = initModels(sequelize);
    try {
      await Orders.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(500).json({ message: "Xóa thành công" });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAllOrder: async (req, res) => {
    const { Orders } = initModels(sequelize);
    try {
      const orders = await Orders.findAll();
      res.status(500).json(orders);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = OrderController;
