/*
  Warnings:

  - Added the required column `experienceLevel` to the `GithubData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GithubData" ADD COLUMN     "experienceLevel" TEXT NOT NULL;
