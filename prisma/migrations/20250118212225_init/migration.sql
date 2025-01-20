-- CreateTable
CREATE TABLE "GithubData" (
    "id" TEXT NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "skills" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "activityTimeline" TEXT NOT NULL,
    "numberOfLeads" INTEGER NOT NULL,
    "clerkIdOfTheUserWhoCreatedTheGithubData" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GithubData_pkey" PRIMARY KEY ("id")
);
