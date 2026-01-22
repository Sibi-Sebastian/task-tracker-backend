// src/modules/auth/auth.repository.js
const prisma = require("../../database/prisma");

exports.findByEmail = (email) => {
  return prisma.user.findUnique({ where: { email } });
};

exports.createUser = (data) => {
  return prisma.user.create({ data });
};

exports.saveRefreshToken = (data) => {
  return prisma.refreshToken.create({ data });
};

exports.findRefreshToken = (token) => {
  return prisma.refreshToken.findUnique({
    where: { token },
  });
};

exports.deleteRefreshToken = (token) => {
  return prisma.refreshToken.delete({ where: { token } });
};
