import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const params = {
    TableName: process.env.tableName,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      entryId: event.pathParameters.id
    }
  };

  const result = await dynamoDb.query(params);
  if (!result.Item) {
    throw new Error("Item not found.");
  }

  return result.Item;
});