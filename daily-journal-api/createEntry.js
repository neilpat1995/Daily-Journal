import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.tableName,
    Item: {
      userId: "123",
      entryId: uuid.v1(),
      title: data.title,
      description: data.description,
      entryTimestamp: data.timestamp
    }
  };

  await dynamoDb.put(params);

  return params.Item;
});