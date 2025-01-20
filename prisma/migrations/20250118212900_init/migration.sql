/*
  Warnings:

  - Added the required column `githubData` to the `GithubData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GithubData" ADD COLUMN     "githubData" TEXT NOT NULL;
