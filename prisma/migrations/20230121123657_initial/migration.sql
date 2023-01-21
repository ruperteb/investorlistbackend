-- CreateTable
CREATE TABLE "Investor" (
    "id" SERIAL NOT NULL,
    "investorName" TEXT NOT NULL,
    "commercial" BOOLEAN NOT NULL DEFAULT false,
    "industrial" BOOLEAN NOT NULL DEFAULT false,
    "retail" BOOLEAN NOT NULL DEFAULT false,
    "residential" BOOLEAN NOT NULL DEFAULT false,
    "hotel" BOOLEAN NOT NULL DEFAULT false,
    "wc" BOOLEAN NOT NULL DEFAULT false,
    "gau" BOOLEAN NOT NULL DEFAULT false,
    "kzn" BOOLEAN NOT NULL DEFAULT false,
    "allregions" BOOLEAN NOT NULL DEFAULT false,
    "minInvest" INTEGER NOT NULL DEFAULT 0,
    "maxInvest" INTEGER NOT NULL DEFAULT 100,
    "listed" BOOLEAN NOT NULL DEFAULT false,
    "unlisted" BOOLEAN NOT NULL DEFAULT false,
    "private" BOOLEAN NOT NULL DEFAULT false,
    "bee" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Investor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "officeNo" TEXT NOT NULL,
    "mobileNo" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "investorID" INTEGER NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_investorID_fkey" FOREIGN KEY ("investorID") REFERENCES "Investor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
