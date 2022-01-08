import { DynamoDBClient, RequestLimitExceeded } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument, PutCommand, PutCommandInput } from '@aws-sdk/lib-dynamodb';
import { Request, Response } from '@softchef/lambda-events';


export async function handler(event: { [Key: string]: any }) {

  const request = new Request(event);
  const response = new Response();
  try {
    const client = DynamoDBDocument.from(
      new DynamoDBClient({}),
    );

    const params: PutCommandInput = {
      TableName: process.env.TEST_TABLE,
      Item: {
        username: request.input('username'),
        password: request.input('password'),
      },
    };

    /** request.input
     * {
     *  quiz: 11
     * }
    */
    /** request.parameters
     * exam.com/quiz/11
    */
    /** request.get
     * exam.com?quiz=11
    */

    const command = await client.send(
      new PutCommand(params),
    );
    return response.json({
      created: true,
    }, 200);
  } catch (err) {
    return response.error(err, 500);
  };

}