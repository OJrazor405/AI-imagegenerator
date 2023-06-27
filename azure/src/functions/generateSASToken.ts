import { app } from "@azure/functions";
import generateSASToken from "../../lib/generateSASToken";

app.http("generateSASToken", {
    methods: ["GET"],
    authLevel: "anonymous",
    handler: async (request, context) => {
        const sasToken = await generateSASToken();
        return { body: sasToken };
        },
});