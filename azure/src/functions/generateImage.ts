import { app, HttpRequest } from "@azure/functions";
import openai from "../../lib/openai";
import axios from "axios";
import generateSASToken from "../../lib/generateSASToken";
import { BlobServiceClient } from "@azure/storage-blob";

const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const containerName = "images";

const generateImage = async function (request: HttpRequest, context): Promise<any> {

    const { prompt }: any = await request.json();

    console.log(`Prompt is ${prompt}`);

    const response = await openai.createImage({
        prompt: prompt,
        n: 1,
        size: '1024x1024',
    });  

    const image_url = response.data.data[0].url;

    const res = await axios.get(image_url, { responseType: 'arraybuffer' });

    const arrayBuffer = res.data;

    const sasToken = await generateSASToken();

    const blobServiceClient = new BlobServiceClient(
        `https://${accountName}.blob.core.windows.net?${sasToken}`,
    );

    const containerClient = blobServiceClient.getContainerClient(containerName);

    //generate current timestamp
    const timestamp = new Date().getTime();
    const file_name = `${prompt}_${timestamp}.png`;
    
    const blockBlobClient = containerClient.getBlockBlobClient(file_name);

    try {
        await blockBlobClient.uploadData(arrayBuffer);
        console.log(`Upload of ${file_name} successful`);
        } catch (error) {
        console.log(`Error uploading ${file_name}: ${error.message}}`);
    }

    return {body: "Successfully uploaded image"};
};


export default generateImage;

app.http("generateImage", {
    methods: ["POST"],
    authLevel: "anonymous",
    handler: generateImage,
});



        
