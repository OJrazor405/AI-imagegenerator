import { NestedMiddlewareError } from 'next/dist/build/utils';
import { NextResponse } from 'next/server';

export async function POST(request:Request) {
    console.log(request)
    const res = await request.json(); //res now contains body
    const prompt = res.prompt;

    const response = await fetch('http://localhost:7071/api/generateImage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({prompt}),
    })

    const textData = await response.text();

    return NextResponse.json(textData);
}