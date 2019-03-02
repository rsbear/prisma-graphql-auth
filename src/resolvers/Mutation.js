const { prisma } = require("./../generated/prisma-client");
const { hash, compare } = require("bcrypt");
const { sign } = require("jsonwebtoken");

const Mutation = {
  signup: async (parent, { name, email, password }, context) => {
    const hashedPassword = await hash(password, 10);
    const user = await context.prisma.createUser({
      name,
      email,
      password: hashedPassword
    });
    return {
      token: sign({ userId: user.id }, APP_SECRET),
      user
    };
  }
};

module.exports = { Mutation };
