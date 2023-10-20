const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Warranties', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    warranty_period: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    warranty_detail: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    product_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Products',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'Warranties',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "Warranties_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
