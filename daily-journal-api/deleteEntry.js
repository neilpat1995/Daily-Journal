import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
    // Delete the entry with the given entry ID
    const params = {
        TableName: process.env.tableName,
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId,
            entryId: event.pathParameters.id
        },
        ReturnValues: "ALL_OLD"
    };

    await dynamoDb.delete(params);

    return {
        status: true
    };
});