import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import openai from "../../lib/openai";

export async function getChatGPTSuggestion(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: "Write a random text prompt for DALL-E to generate an image, this prompt will be shown to the user, include details such as the genre and what type of painting it should be, options can include: oil painting, watercolor, photo-realistic, 4k, abstract, modern, blackand white etc. do not wrap the answer in quotes.",
        max_tokens: 200,
        temperature: 0.8,
    });
    
    context.log(`Http function processed request for url "${request.url}"`);

    const responseText = response.data.choices[0].text;

    return { body: responseText };
};

app.http('getChatGPTSuggestion', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: getChatGPTSuggestion,
});




