const { initModels } = require("../models/init-models");
const sequelize = require("../connect/sequelize");
const { v4: uuidv4 } = require("uuid");

const CategoryController = {
  addCategory: async (req, res) => {
    const { Categories } = initModels(sequelize);
    const id = uuidv4();
    try {
      const newCategory = await Categories.create({ id, ...req.body });
      res.status(200).json(newCategory);
    } catch (error) {
      res.status(500).json({ error: "Không thể thêm category" });
    }
  },
  deleteCategorty: async (req, res) => {
    const { Categories } = initModels(sequelize);
    const categoryId = req.params.id;
    try {
      await Categories.destroy({
        where: {
          id: categoryId,
        },
      });
      res.status(200).json({ message: "Xóa category thành công " });
    } catch (error) {
      res.status(500).json({ error: "Không thể xóa category" });
    }
  },
  getCatagoryId: async (req, res) => {
    const { Categories } = initModels(sequelize);
    const id = req.params.id;
    try {
      const category = await Categories.findByPk(id);
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAllCategory: async (req, res) => {
    const { Categories } = initModels(sequelize);
    try {
      const categories = await Categories.findAll();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updateCategory: async (req, res) => {
    const { Categories } = initModels(sequelize);
    try {
      const category = await Categories.findByPk(req.params.id);
      if (category) {
        await Categories.update(req.body, {
          where: {
            id: req.params.id,
          },
        });
        const updatedCategory = await Categories.findByPk(req.params.id); 
        res.status(200).json(updatedCategory);
      } else {
        res.status(404).json({ error: "Không tìm thấy categoryId" });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = CategoryController;
