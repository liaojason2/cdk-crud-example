import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument, GetCommand, GetCommandInput } from '@aws-sdk/lib-dynamodb';

export async function handler() {

  const client = DynamoDBDocument.from(
    new DynamoDBClient({}),
  );

  const params: GetCommandInput = {
    TableName: 'test_table',
    Key: {
      username: 'jason',
    },
  };

  const command = await client.send(
    new GetCommand(params),
  );
  console.log(command);
}