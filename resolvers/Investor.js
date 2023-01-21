function contacts (parent, args, context) {
    return context.prisma.investor.findUnique({ where: { id: parent.id } }).contacts()
  }

  

  module.exports = {
    contacts,
    
  }
