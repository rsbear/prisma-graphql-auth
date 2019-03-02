const { prisma } = require("./../generated/prisma-client");

const Query = {
  users: (parent, args, context) => {
    return context.prisma.users();
  }
};

module.exports = { Query };
