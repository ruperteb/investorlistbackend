const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

async function postInvestor(parent, args, context, info) {
  /* const userId = getUserId(context) */

  const newInvestor = await context.prisma.investor.create({
    data: {
      investorName: args.investorName,
      commercial: args.commercial,
      industrial: args.industrial,
      residential: args.residential,
      retail: args.retail,
      hotel: args.hotel,
      wc: args.wc,
      gau: args.gau,
      kzn: args.kzn,
      allregions: args.allregions,
      minInvest: args.minInvest,
      maxInvest: args.maxInvest,
      listed: args.listed,
      unlisted: args.unlisted,
      private: args.private,
      bee: args.bee,
      notes: args.notes,

    }
  })
  /*  context.pubsub.publish("NEW_LINK", newLink) */
  console.log(newInvestor.id)

  const newContact = await context.prisma.contact.create({


    data: {
      name: args.contactName,
      position: args.contactPosition,
      officeNo: args.contactOfficeNo,
      mobileNo: args.contactMobileNo,
      email: args.contactEmail,

      investorName: { connect: { id: newInvestor.id } },
    }
  })
  /*  context.pubsub.publish("NEW_LINK", newLink) */

  return newContact


  return newInvestor

}

async function updateInvestor(parent, args, context, info) {
  /* const userId = getUserId(context) */

  const updatedInvestor = await context.prisma.investor.update({
    where: { id: args.investorId },
    data: {
      investorName: args.investorName,
      commercial: args.commercial,
      industrial: args.industrial,
      residential: args.residential,
      retail: args.retail,
      hotel: args.hotel,
      wc: args.wc,
      gau: args.gau,
      kzn: args.kzn,
      allregions: args.allregions,
      minInvest: args.minInvest,
      maxInvest: args.maxInvest,
      listed: args.listed,
      unlisted: args.unlisted,
      private: args.private,
      bee: args.bee,
      notes: args.notes,
      contacts: {
        update: [{
          where: {
            id: args.contactId
          },
          data: {
            name: args.contactName,
            position: args.contactPosition,
            officeNo: args.contactOfficeNo,
            mobileNo: args.contactMobileNo,
            email: args.contactEmail,
          }
        }]
      }

    }
  })




  return updatedInvestor

}

async function setPrimaryContact(parent, args, context, info) {
  /* const userId = getUserId(context) */

  const investor = await context.prisma.investor.findOne({
    where: {
      id: args.investorID,

    },
    select: {
      id: true,
      investorName: true,
      commercial: true,
      industrial: true,
      residential: true,
      retail: true,
      hotel: true,
      wc: true,
      gau: true,
      kzn: true,
      allregions: true,
      minInvest: true,
      maxInvest: true,
      listed: true,
      unlisted: true,
      private: true,
      bee: true,
      notes: true,
      contacts: {
        include: {
          investorName: true,
        },
      },
    },
  })

  console.log(investor)
  var contactsArray = []
  var selectedContact = investor.contacts.filter(t => {
    if (t)
      return (t.id === args.contactID)
  })
  var otherContacts = investor.contacts.filter(t => {
    if (t)
      return (t.id !== args.contactID)
  })


  contactsArray = [...selectedContact, ...otherContacts]
  const contactsArrayCleaned = contactsArray.map(contact => {
    let formattedContact = {
      name: contact.name,
      position: contact.position,
      email: contact.email,
      officeNo: contact.officeNo,
      mobileNo: contact.mobileNo
    }
    return formattedContact

  })
  console.log(contactsArrayCleaned, "log")

  console.log(investor)
  const delArray = []
  const delMap = await investor.contacts.map((contact, index) => {
    console.log(contact.id)
    delArray[index] = { id: contact.id }
  })

  console.log(delArray)
  const contactDel = await context.prisma.investor.update({
    where: { id: args.investorID },
    data: {
      contacts: {
        delete: delArray,
      },
    },
  })

  

  const updatedInvestor = await context.prisma.investor.update({
    where: { id: args.investorID },
    data: {

     

      contacts: {
        create: contactsArrayCleaned
      }

    }
  })

  return updatedInvestor

}

async function deleteInvestor(parent, args, context, info) {
  const investor = await context.prisma.investor.findOne({
    where: {
      id: args.investorId,

    },
    select: {
      id: true,
      investorName: true,
      contacts: {
        include: {
          investorName: true,
        },
      },
    },
  })

  console.log(investor)
  const delArray = []
  const delMap = await investor.contacts.map((contact, index) => {
    console.log(contact.id)
    delArray[index] = { id: contact.id }
  })

  console.log(delArray)
  const contactDel = await context.prisma.investor.update({
    where: { id: args.investorId },
    data: {
      contacts: {
        delete: delArray,
      },
    },
  })

  /* const contactDel = await context.prisma.contact.delete({
    where: { investorID: args.investorId },
  }) */

  const investorDel = await context.prisma.investor.delete({
    where: { id: args.investorId },
  })



  /* const userId = getUserId(context) */
  return investor
}


function postContact(parent, args, context, info) {
  /* const userId = getUserId(context) */

  const investorId = args.investorID

  const newContact = context.prisma.contact.create({


    data: {
      name: args.contactName,
      position: args.contactPosition,
      officeNo: args.contactOfficeNo,
      mobileNo: args.contactMobileNo,
      email: args.contactEmail,

      investorName: { connect: { id: investorId } },
    }
  })
  /*  context.pubsub.publish("NEW_LINK", newLink) */

  return newContact
}

async function deleteContact(parent, args, context, info) {

  /*  const contact =  await context.prisma.contact.findOne({
     where: {
       id: args.ContactID
     },
   }).investorName() */


  const contactDel = await context.prisma.contact.delete({
    where: { id: args.contactID },
  })
  /* const userId = getUserId(context) */
  return contactDel
}

async function login(parent, args, context, info) {
  // 1
  const user = await context.prisma.user.findOne({ where: { email: args.email } })
  if (!user) {
    throw new Error('No such user found')
  }

  // 2
  const valid = await bcrypt.compare(args.password, user.password)
  if (!valid) {
    throw new Error('Invalid password')
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  // 3
  return {
    token,
    user,
  }
}

async function signup(parent, args, context, info) {
  // 1
  const password = await bcrypt.hash(args.password, 10)

  // 2
  const user = await context.prisma.user.create({ data: { ...args, password } })

  // 3
  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  // 4
  return {
    token,
    user,
  }
}





module.exports = {

  postInvestor,
  postContact,
  deleteInvestor,
  deleteContact,
  updateInvestor,
  setPrimaryContact,
  login,
  signup,
}