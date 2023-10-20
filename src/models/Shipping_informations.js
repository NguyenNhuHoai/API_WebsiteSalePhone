const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "Shipping_informations",
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      shipping_address: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      delivery_address: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      estimated_time: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      shipping_service: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "Shipping_informations",
      schema: "public",
      timestamps: true,
      indexes: [
        {
          name: "Shipping_informations_pkey",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};
