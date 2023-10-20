const { Sequelize } = require("sequelize");

const dbName = process.env.DB_NAME;
// const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;

const sequelize = new Sequelize(
  "webKinhDoanhDienThoai",
  "postgres",
  "12341234",
  {
    host: "localhost",
    dialect: "postgres",
    port: "5432",
    logging: false,
  }
);

module.exports = sequelize;
