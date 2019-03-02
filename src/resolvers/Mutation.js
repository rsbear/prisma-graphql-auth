const { prisma } = require("./../generated/prisma-client");
const { hash, compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { APP_SECRET } = require("./../utils");

const Mutation = {
  signup: async (parent, { email, name, password }, context) => {
    const hashedPassword = await hash(password, 10);
    const user = await context.prisma.createUser({
      email,
      name,
      password: hashedPassword
    });
    return {
      token: sign({ userId: user.id }, APP_SECRET),
      user
    };
  },

  login: async (parent, { email, password }, context) => {
    const user = await context.prisma.user({ email });
    if (!user) {
      throw new Error(`No user found for email: ${email}`);
    }
    const passwordValid = await compare(password, user.password);
    if (!passwordValid) {
      throw new Error("Invalid password");
    }
    return {
      token: sign({ userId: user.id }, APP_SECRET),
      user
    };
  }
};

module.exports = { Mutation };
