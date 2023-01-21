function investorName (parent, args, context) {
    return context.prisma.contact.findUnique({ where: { id: parent.id } }).investorName()
  }

  module.exports = {
    investorName,
    
  }