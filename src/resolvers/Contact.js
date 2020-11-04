function investorName (parent, args, context) {
    return context.prisma.investor.findOne({ where: { id: parent.id } }).investorName()
  }

  module.exports = {
    investorName,
    
  }