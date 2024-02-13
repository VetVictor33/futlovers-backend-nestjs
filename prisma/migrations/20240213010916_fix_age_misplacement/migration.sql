/*
  Warnings:

  - You are about to drop the column `age` on the `teams` table. All the data in the column will be lost.
  - Added the required column `age` to the `players` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "players" ADD COLUMN     "age" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "teams" DROP COLUMN "age";
