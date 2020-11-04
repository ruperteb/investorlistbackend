function contacts (parent, args, context) {
    return context.prisma.investor.findOne({ where: { id: parent.id } }).contacts()
  }

  

  module.exports = {
    contacts,
    
  }
