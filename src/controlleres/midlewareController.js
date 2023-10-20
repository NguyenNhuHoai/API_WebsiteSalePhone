const jwt = require("jsonwebtoken");
const { initModels } = require("../models/init-models");
const sequelize = require("../connect/sequelize");
const middlewareController = {
  verifyToken: (req, res, next) => {
    console.log(req.headers);
    const token = req.headers.token;
    if (token) {
      // Bearer
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (error, user) => {
        if (error) {
          res.status(403).json({ message: "Mã thông báo không hợp lệ" });
        }
        req.user = user;
        next();
      });
    } else {
      res.status(401).json({ message: "Người dùng chưa được xác thực" });
    }
  },
  verifyTokenAndAdminAuth: (req, res, next) => {
    const { Users, Roles } = initModels(sequelize);
    middlewareController.verifyToken(req, res, async () => {
      try {
        const userAdmin = await Users.findOne({
          where: {
            id: req.user.id,
          },
          include: {
            model: Roles,
            attributes: ["roleName"],
          },
        });

        if (
          req.user.id === req.params.id ||
          (userAdmin && userAdmin.Role.role_name === "admin")
        ) {
          next();
        } else {
          res.status(403).json("You are not allowed to delete others");
        }
      } catch (error) {
        res.status(500).json(error);
      }
    });
  },
};

module.exports = middlewareController;
