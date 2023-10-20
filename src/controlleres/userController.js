const bcrypt = require("bcrypt");
const sequelize = require("../connect/sequelize");
const { initModels } = require("../models/init-models");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const { use } = require("../routes/adminRouter");

let refreshTokens = [];

const userController = {
  registerUser: async (req, res) => {
    const { Users } = initModels(sequelize);
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);
      const newUser = await Users.create({
        id: uuidv4(),
        username: req.body.username,
        email: req.body.email,
        address: req.body.address,
        password: hashed,
        role_id: req.body.role_id,
      });
      res.status(200).json(newUser);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  generationAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        role_id: user.role_id,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "30s" }
    );
  },
  generationRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        role_id: user.role_id,
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "300d" }
    );
  },
  loginUser: async (req, res) => {
    const { Users } = initModels(sequelize);
    try {
      const user = await Users.findOne({
        where: {
          username: req.body.username,
        },
      });
      if (!user) {
        res.status(404).json({ message: "Tên người dùng không tồn tại" });
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        res.status(404).json({ message: "Sai mật khẩu" });
      }
      if (user && validPassword) {
        const accessToken = userController.generationAccessToken(user);
        const refreshToken = userController.generationRefreshToken(user);
        refreshTokens.push(refreshToken);
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict",
        });
        const { password, ...other } = user.dataValues;
        res.status(200).json({ ...other, accessToken });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  requestRefreshToken: async (req, res) => {
    const refreshToken = req.cookies ? req.cookies.refreshToken : null;
    if (!refreshToken)
      return res.status(401).json({ message: "Chưa được xác thực người dùng" });
    if (!refreshTokens.includes(refreshToken)) {
      return res.status(403).json("Mã thông báo làm mới không hợp lệ");
    }
    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (error, user) => {
      if (error) {
        console.log(error);
      }
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
      const newAccessToken = userController.generationAccessToken(user);
      const newRefreshToken = userController.generationRefreshToken(user);
      refreshTokens.push(newRefreshToken);
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      res.status(200).json({ accessToken: newAccessToken });
    });
  },

  Logout: async (req, res) => {
    res.clearCookie("refreshToken");
    refreshTokens = refreshTokens.filter(
      (token) => token !== req.cookies.refreshToken
    );
    res.status(200).json("Đăng xuất thành công");
  },
};

module.exports = userController;
