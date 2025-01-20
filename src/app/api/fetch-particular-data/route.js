import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

import prismaClientConfig from '@/prismaClientConfig';


export async function POST(req) {

    try {

        const { userId } = await auth();


        const { githubDataId } = await req.json();


        const particularGithubData = await prismaClientConfig.githubData.findUnique({
            where: {
                id: githubDataId,
                clerkIdOfTheUserWhoCreatedTheGithubData: userId
            }
        });


        return NextResponse.json(
            {
              success: true,
              data: particularGithubData,
            },
            { status: 200 }
        );

        
    } catch (error) {

        console.log(error);
        
        
        return NextResponse.json(
            {
                error: error,
            },
            { status: 500 }
        );

    }

}