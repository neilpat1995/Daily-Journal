import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
    // Get list of journal entries for the specified user
    const params = {
        KeyConditionExpression: "userId = :s",
        ExpressionAttributeValues: {
            ":s": "123",
        },
        TableName: process.env.tableName
    };

    const results = await dynamoDb.query(params);
    return results;
});