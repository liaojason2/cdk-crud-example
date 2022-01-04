import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument, PutCommand, PutCommandInput } from '@aws-sdk/lib-dynamodb';


export async function handler(event: { [Key: string]: any }) {

  const client = DynamoDBDocument.from(
    new DynamoDBClient({}),
  );

  const params: PutCommandInput = {
    TableName: process.env.TEST_TABLE,
    Item: {
      username: 'jason',
      password: '123',
    },
  };

  const command = await client.send(
    new PutCommand(params),
  );
  console.log(command);
}