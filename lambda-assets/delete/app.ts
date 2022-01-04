import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument, DeleteCommand, DeleteCommandInput } from '@aws-sdk/lib-dynamodb';

export async function handler() {

  const client = DynamoDBDocument.from(
    new DynamoDBClient({}),
  );

  const params: DeleteCommandInput = {
    TableName: 'test_table',
    Key: {
      username: 'jason',
    },
  };

  const command = await client.send(
    new DeleteCommand(params),
  );
  console.log(command);
}