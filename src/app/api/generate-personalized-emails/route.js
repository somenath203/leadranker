import { NextResponse } from 'next/server';

import { GenerateEmailModel } from '@/generate-personalized-email';


export async function POST(req) {

    try {

        const { promptToGenerateEmail } = await req.json();


        const response = await GenerateEmailModel.sendMessage(promptToGenerateEmail);
        
        const result = response?.response?.text();
            

        return NextResponse.json(
            {
                success: true,
                result: result
            },
            { status: 200 }
        );
        
        
    } catch (error) {

        console.error(error);

        return NextResponse.json(
        {
            error: error,
        },
        { status: 500 }
        );

    }

}