const { initModels } = require("../models/init-models");
const sequelize = require("../connect/sequelize");
const { v4: uuidv4 } = require("uuid");

const shippingController = {
  addShipppingController: async (req, res) => {
    const { Shipping_informations } = initModels(sequelize);
    const id = uuidv4();
    try {
      const newShipping = await Shipping_informations.create({
        id,
        ...req.body,
      });
      res.status(200).json(newShipping);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteShippingControoler: async (req, res) => {
    const { Shipping_informations } = initModels(sequelize);
    try {
      await Shipping_informations.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json({ message: "Xóa thành công" });
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = shippingController;
