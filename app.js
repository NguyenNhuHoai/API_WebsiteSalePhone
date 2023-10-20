const express = require("express");
const dotenv = require("dotenv");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const sequelize = require("./src/connect/sequelize");
const cookieParser = require("cookie-parser");

const categoryRoute = require("./src/routes/categoryRouter");
const roleRoute = require("./src/routes/roleRouter");
const productRoute = require("./src/routes/productRouter");
const promotionRoute = require("./src/routes/promotionRouter");
const userRoute = require("./src/routes/userRouter");
const adminRoute = require("./src/routes/adminRouter");
const review_content = require("./src/routes/review_commentsRouter");
const orderRoute = require("./src/routes/orderRouter");
const shippingRoute = require("./src/routes/shippingRouter");

const app = express();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(morgan("common"));
sequelize
  .sync()
  .then(() => {
    console.log("Tables synchronized");
  })
  .catch((err) => {
    console.error("Error synchronizing tables", err);
  });
dotenv.config();
const PORT = process.env.PORT || 3333;

app.use("/v1/category", categoryRoute);
app.use("/v1/role", roleRoute);
app.use("/v1/product", productRoute);
app.use("/v1/promotion", promotionRoute);
app.use("/v1/user", userRoute);
app.use("/v1/admin", adminRoute);
app.use("/v1/reviewContent", review_content);
app.use("/v1/order", orderRoute);
app.use("/v1/ship", shippingRoute);

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
