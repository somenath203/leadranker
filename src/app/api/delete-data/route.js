import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

import prismaClientConfig from '@/prismaClientConfig';


export async function POST(req) {

    try {

        const { userId } = await auth();

        const { itemId } = await req.json();


        await prismaClientConfig.githubData.delete({
            where: {
              id: itemId,
              clerkIdOfTheUserWhoCreatedTheGithubData: userId
            },
        });
        
      
        return NextResponse.json(
            {
              success: true
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