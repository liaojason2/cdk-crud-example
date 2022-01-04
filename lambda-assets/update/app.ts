import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument, UpdateCommand, UpdateCommandInput } from '@aws-sdk/lib-dynamodb';

export async function handler() {

  const client = DynamoDBDocument.from(
    new DynamoDBClient({}),
  );

  const params: UpdateCommandInput = {
    TableName: 'test_table',
    Key: {
      username: 'jason',
    },
    AttributeUpdates: {
      username: {
        Action: 'PUT',
        Value: 'jason2',
      },
    },
  };

  const command = await client.send(
    new UpdateCommand(params),
  );
  console.log(command);
}