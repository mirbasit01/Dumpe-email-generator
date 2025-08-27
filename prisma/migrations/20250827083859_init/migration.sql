-- CreateTable
CREATE TABLE "public"."Alias" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Alias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Message" (
    "id" TEXT NOT NULL,
    "aliasId" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "subject" TEXT,
    "body" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Alias_address_key" ON "public"."Alias"("address");

-- AddForeignKey
ALTER TABLE "public"."Message" ADD CONSTRAINT "Message_aliasId_fkey" FOREIGN KEY ("aliasId") REFERENCES "public"."Alias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
