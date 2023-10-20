const { initModels } = require("../models/init-models");
const sequelize = require("../connect/sequelize");
const adminController = {
  getAllUser: async (req, res) => {
    const { Users } = initModels(sequelize);
    try {
      const users = await Users.findAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteUser: async (req, res) => {
    try {
      const user = await user.findByPk(req.params.id);
      req.status(200).json("delete thành công");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = adminController;
