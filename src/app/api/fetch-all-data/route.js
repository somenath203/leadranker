import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

import prismaClientConfig from '@/prismaClientConfig';


export async function GET() {

    try {

        const { userId } = await auth();


        const allGithubDataCreatedByTheUser = await prismaClientConfig.githubData.findMany({
            where: {
                clerkIdOfTheUserWhoCreatedTheGithubData: userId
            }
        });

        return NextResponse.json(
            {
              success: true,
              data: allGithubDataCreatedByTheUser,
            },
            { status: 200 }
        );
        
    } catch (error) {
        
        console.error('Error fetching GitHub data:', error);

        return NextResponse.json(
            {
                error: error,
            },
            { status: 500 }
        );

    }

}