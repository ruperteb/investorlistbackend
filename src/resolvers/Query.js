

  async function investors(parent, args, context, info) {
    return context.prisma.investor.findMany()
    
  }

  module.exports = {
    investors,
   
  }