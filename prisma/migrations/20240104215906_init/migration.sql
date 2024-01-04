/*
  Warnings:

  - You are about to drop the column `activationLink` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `isActivated` on the `Users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Users_activationLink_key";

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "activationLink",
DROP COLUMN "isActivated";

-- CreateTable
CREATE TABLE "UserPost" (
    "id" SERIAL NOT NULL,
    "post_text" TEXT NOT NULL,
    "post_picture" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostLike" (
    "id" SERIAL NOT NULL,
    "post_id" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "PostLike_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserPost_userId_idx" ON "UserPost"("userId");

-- AddForeignKey
ALTER TABLE "UserPost" ADD CONSTRAINT "UserPost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostLike" ADD CONSTRAINT "PostLike_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "UserPost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
