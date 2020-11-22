function investorName (parent, args, context) {
    return context.prisma.contact.findOne({ where: { id: parent.id } }).investorName()
  }

  module.exports = {
    investorName,
    
  }