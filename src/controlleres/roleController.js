const { initModels } = require("../models/init-models");
const sequelize = require("../connect/sequelize");
const { v4: uuidv4 } = require("uuid");

const RoleController = {
  addRole: async (req, res) => {
    const { Roles } = initModels(sequelize);
    const id = uuidv4();
    try {
      const newRole = await Roles.create({ id, ...req.body });
      res.status(200).json(newRole);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleRole: async (req, res) => {
    const { Roles } = initModels(sequelize);
    const roleId = req.params.id;
    try {
      await Roles.destroy({
        where: {
          id: roleId,
        },
      });
      res.status(200).json({ message: "Xóa thàn công role" });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getRoleId: async (req, res) => {
    const { Roles } = initModels(sequelize);
    const roleId = req.params.id;
    try {
      const role = await Roles.findByPk(roleId);
      res.status(200).json(role);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAllRoles: async (req, res) => {
    const { Roles } = initModels(sequelize);
    try {
      const roles = await Roles.findAll();
      res.status(200).json(roles);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updateRole: async (req, res) => {
    const { Roles } = initModels(sequelize);
    const roleId = req.params.id;
    try {
      const role = await Roles.findByPk(roleId);
      if (role) {
        await Roles.update(req.body, {
          where: {
            id: roleId,
          },
        });
      }
      const updateRole = await Roles.findByPk(req.params.id);
      res.status(200).json(updateRole);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = RoleController;
