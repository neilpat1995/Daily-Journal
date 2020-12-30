import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
    // Update entry with given new entry and given entry ID
    const data = JSON.parse(event.body);
    const params = {
        TableName: process.env.tableName,
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId,
            entryId: event.pathParameters.id
        },
        UpdateExpression: 'set description = :desc, entryTimestamp = :time, title = :title',
        ExpressionAttributeValues: {
            ':desc': data.description || null,
            ':title': data.title || null,
            ':time': new Date().toString()
        },
        ReturnValues: "ALL_NEW"
    };

    await dynamoDb.update(params);

    return {
        status: true
    };
});