const { prisma } = require("./../generated/prisma-client");
const { getUserId, APP_SECRET } = require("./../utils");

const Query = {
  me: (parent, args, context) => {
    const userId = getUserId(context);
    return context.prisma.user({ id: userId });
  },

  users: (parent, args, context) => {
    return context.prisma.users();
  }
};

module.exports = { Query };
