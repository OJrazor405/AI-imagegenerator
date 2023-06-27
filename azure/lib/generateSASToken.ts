import { BlobServiceClient, 
    StorageSharedKeyCredential, 
    BlobSASPermissions,
    generateBlobSASQueryParameters,
 } from "@azure/storage-blob";

const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const accountKey = process.env.AZURE_STORAGE_ACCOUNT_ACCESS_KEY;
const containerName = "images";

const sharedKeyCredential = new StorageSharedKeyCredential(
    accountName, 
    accountKey
);

const blobServiceClient = new BlobServiceClient(
    `https://${accountName}.blob.core.windows.net`, 
    sharedKeyCredential
);

async function generateSASToken() {
    const containerClient = blobServiceClient.getContainerClient(containerName);

    const permissions = new BlobSASPermissions();
    permissions.write = true;
    permissions.read = true;
    permissions.create = true;

    const expiryDate = new Date();
    expiryDate.setMinutes(expiryDate.getMinutes() + 30);

    const sasToken = generateBlobSASQueryParameters(
        {
            containerName: containerClient.containerName,
            permissions: permissions,
            expiresOn: expiryDate,
        },
        sharedKeyCredential
    ).toString();

    return sasToken;
}

export default generateSASToken;