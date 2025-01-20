import { PrismaClient } from "@prisma/client";


const prismaClientSingleton = () => {

  return new PrismaClient();

};


const globalPrisma = global.prismaGlobal || prismaClientSingleton();

const prisma = globalPrisma;


module.exports = prisma;


if (process.env.NODE_ENV !== "production") {

  global.prismaGlobal = prisma;
  
}