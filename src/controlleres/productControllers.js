const { initModels } = require("../models/init-models");
const sequelize = require("../connect/sequelize");
const { v4: uuidv4 } = require("uuid");

const ITEMS_PER_PAGE = 10;
const ProductController = {
  addProduct: async (req, res) => {
    const { Products } = initModels(sequelize);
    const id = uuidv4();
    try {
      const newProduct = await Products.create({ id, ...req.body });
      res.status(200).json(newProduct);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAllProduct: async (req, res) => {
    const { Products } = initModels(sequelize);
    try {
      const page = req.query.page || 1;
      const offset = (page - 1) * ITEMS_PER_PAGE;
      const totalCount = await Products.count();
      const totalPage = Math.ceil(totalCount / ITEMS_PER_PAGE);
      const products = await Products.findAll({
        limit: ITEMS_PER_PAGE,
        offset: offset,
      });
      res.status(200).json({ products, totalPage, currentPage: page });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getProductId: async (req, res) => {
    const { Products } = initModels(sequelize);
    const productId = req.params.id;
    try {
      const product = await Products.findByPk(productId);
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteProduct: async (req, res) => {
    const { Products } = initModels(sequelize);
    const productId = req.params.id;
    try {
      await Products.destroy({
        where: {
          id: productId,
        },
      });
      res.status(200).json({ message: "Xóa sản phẩm thành công" });
    } catch (error) {}
  },
  updateProduct: async (req, res) => {
    const { Products } = initModels(sequelize);
    const productId = req.params.id;
    try {
      const product = await Products.findByPk(productId);
      if (product) {
        await Products.update(req.body, {
          where: {
            id: productId,
          },
        });
      }
      const updateProduct = await Products.findByPk(productId);
      res.status(200).json(updateProduct);
    } catch (error) {
      res.status(200).json(error);
    }
  },
};

module.exports = ProductController;
