

  async function investors(parent, args, context, info) {
    return context.prisma.investor.findMany()
    
  }

  async function contacts(parent, args, context, info) {
    return context.prisma.contact.findMany()
    
  }

  module.exports = {
    investors,
    contacts,
   
  }