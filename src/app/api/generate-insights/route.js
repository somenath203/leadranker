import { NextResponse } from 'next/server';

import { GenerateInightsModel } from '@/generate-insights-gemini-model';


export async function POST(req) {

    try {

        const { promptToGenerateInsights } = await req.json();


        const response = await GenerateInightsModel.sendMessage(promptToGenerateInsights);

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