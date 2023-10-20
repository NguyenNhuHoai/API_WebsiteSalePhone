var DataTypes = require("sequelize").DataTypes;
var _Categories = require("./Categories");
var _OrderDetails = require("./OrderDetails");
var _Orders = require("./Orders");
var _Products = require("./Products");
var _Promotions = require("./Promotions");
var _Review_comments = require("./Review_comments");
var _Roles = require("./Roles");
var _SequelizeMeta = require("./SequelizeMeta");
var _Shipping_informations = require("./Shipping_informations");
var _Users = require("./Users");
var _Warranties = require("./Warranties");

function initModels(sequelize) {
  var Categories = _Categories(sequelize, DataTypes);
  var OrderDetails = _OrderDetails(sequelize, DataTypes);
  var Orders = _Orders(sequelize, DataTypes);
  var Products = _Products(sequelize, DataTypes);
  var Promotions = _Promotions(sequelize, DataTypes);
  var Review_comments = _Review_comments(sequelize, DataTypes);
  var Roles = _Roles(sequelize, DataTypes);
  var SequelizeMeta = _SequelizeMeta(sequelize, DataTypes);
  var Shipping_informations = _Shipping_informations(sequelize, DataTypes);
  var Users = _Users(sequelize, DataTypes);
  var Warranties = _Warranties(sequelize, DataTypes);

  Products.belongsTo(Categories, { as: "category", foreignKey: "category_id"});
  Categories.hasMany(Products, { as: "Products", foreignKey: "category_id"});
  OrderDetails.belongsTo(Orders, { as: "order", foreignKey: "order_id"});
  Orders.hasMany(OrderDetails, { as: "OrderDetails", foreignKey: "order_id"});
  OrderDetails.belongsTo(Products, { as: "product", foreignKey: "product_id"});
  Products.hasMany(OrderDetails, { as: "OrderDetails", foreignKey: "product_id"});
  Review_comments.belongsTo(Products, { as: "product", foreignKey: "product_id"});
  Products.hasMany(Review_comments, { as: "Review_comments", foreignKey: "product_id"});
  Warranties.belongsTo(Products, { as: "product", foreignKey: "product_id"});
  Products.hasMany(Warranties, { as: "Warranties", foreignKey: "product_id"});
  Users.belongsTo(Roles, { as: "role", foreignKey: "role_id"});
  Roles.hasMany(Users, { as: "Users", foreignKey: "role_id"});
  Orders.belongsTo(Users, { as: "id_username_User", foreignKey: "id_username"});
  Users.hasMany(Orders, { as: "Orders", foreignKey: "id_username"});
  Review_comments.belongsTo(Users, { as: "user", foreignKey: "user_id"});
  Users.hasMany(Review_comments, { as: "Review_comments", foreignKey: "user_id"});
  Shipping_informations.belongsTo(Users, { as: "user", foreignKey: "user_id"});
  Users.hasMany(Shipping_informations, { as: "Shipping_informations", foreignKey: "user_id"});

  return {
    Categories,
    OrderDetails,
    Orders,
    Products,
    Promotions,
    Review_comments,
    Roles,
    SequelizeMeta,
    Shipping_informations,
    Users,
    Warranties,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
