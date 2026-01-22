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

exports.refresh = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      const err = new Error("Refresh token missing");
      err.statusCode = 401;
      throw err;
    }

    const accessToken = await authService.refreshToken(refreshToken);

    res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
};

exports.logout = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      await authService.logout(refreshToken);
    }

    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    next(err);
  }
};
