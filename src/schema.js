const { gql } = require("apollo-server-express");

const typeDefs = gql`
type Query {
  
    investors: [Investor],
    contacts: [Contact]
}

type Mutation {
 postInvestor (investorName: String!,
 commercial: Boolean = false,
  industrial: Boolean = false,
  retail: Boolean = false,
  residential: Boolean = false,
  hotel: Boolean = false,
 
  wc: Boolean = false,
  gau: Boolean = false,
  kzn: Boolean = false,
  allregions: Boolean = false,

  contactName: String = "",
  contactPosition: String = "",
  contactOfficeNo: String = "",
 contactMobileNo: String = "",
 contactEmail: String = "",
 minInvest: Int=0,
  maxInvest: Int=100

  listed: Boolean = false,
  unlisted: Boolean = false,
  private: Boolean = false,
  bee: Boolean = false,
  notes: String = "",
 ): Investor!

 updateInvestor (investorId: Int!,
   investorName: String,
 commercial: Boolean = false,
  industrial: Boolean = false,
  retail: Boolean = false,
  residential: Boolean = false,
  hotel: Boolean = false,
 
  wc: Boolean = false,
  gau: Boolean = false,
  kzn: Boolean = false,
  allregions: Boolean = false,

contactId: Int,
  contactName: String = "",
  contactPosition: String = "",
  contactOfficeNo: String = "",
 contactMobileNo: String = "",
 contactEmail: String = "",
 minInvest: Int=0,
  maxInvest: Int=100

  listed: Boolean = false,
  unlisted: Boolean = false,
  private: Boolean = false,
  bee: Boolean = false,
  notes: String = "",
 ): Investor!

 deleteInvestor (investorId: Int): Investor!

 postContact (
  contactName: String = "",
  contactPosition: String = "",
  contactOfficeNo: String = "",
 contactMobileNo: String = "",
 contactEmail: String = "",
 investorID: Int
 ): Contact!

 deleteContact (contactID: Int): Contact!

 setPrimaryContact (investorID: Int, contactID: Int): Investor!

  login (email: String!, password: String!): AuthPayload

   signup(email: String!, password: String!, name: String!): AuthPayload

}

type Investor {
 id: Int!
 investorName: String!
 commercial: Boolean
  industrial: Boolean
  retail: Boolean
  residential: Boolean
  hotel: Boolean
  contacts: [Contact]
  wc: Boolean
  gau: Boolean
  kzn: Boolean
  allregions: Boolean
  minInvest: Int
  maxInvest: Int
  listed: Boolean
  unlisted: Boolean
  private: Boolean
  bee: Boolean
  notes: String
  
  
}

type Contact {
 id: Int!
 name: String!
 position: String
 officeNo: String
 mobileNo: String
 email: String
 investorName: Investor
}

type AuthPayload {
 token: String
 user: User
}

type User {
 id: ID!
 name: String!
 email: String!
 
}

`

module.exports = typeDefs;
