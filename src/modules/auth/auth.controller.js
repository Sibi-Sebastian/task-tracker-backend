// src/modules/auth/auth.controller.js
const authService = require("./auth.service");

exports.register = async (req, res, next) => {
  try {
    const user = await authService.register(req.body);
    const { password, ...safeUser } = user;
    res.status(201).json(safeUser);
  } catch (err) {
    err.statusCode = 400;
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { accessToken, refreshToken } = await authService.login(req.body);

    // HTTP responsibility stays here
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
    });

    res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
};