import * as path from 'path';
import { App, Stack, StackProps, aws_dynamodb, aws_lambda_nodejs as lambda, RemovalPolicy } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    const LAMBDA_ASSETS_PATH = path.resolve(__dirname, '../lambda-assets');

    const table = new aws_dynamodb.Table(this, 'test_table', {
      partitionKey: {
        name: 'username',
        type: aws_dynamodb.AttributeType.STRING,
      },
      removalPolicy: RemovalPolicy.DESTROY,
    });

    const create = new lambda.NodejsFunction(this, 'create', {
      entry: `${LAMBDA_ASSETS_PATH}/create/app.ts`, // accepts .js, .jsx, .ts and .tsx files
      handler: 'handler', // defaults to 'handler'
      environment: {
        TEST_TABLE: table.tableName,
      },
    });

    const del = new lambda.NodejsFunction(this, 'delete', {
      entry: `${LAMBDA_ASSETS_PATH}/delete/app.ts`, // accepts .js, .jsx, .ts and .tsx files
      handler: 'handler', // defaults to 'handler'
      environment: {
        TEST_TABLE: table.tableName,
      },
    });

    const read = new lambda.NodejsFunction(this, 'read', {
      entry: `${LAMBDA_ASSETS_PATH}/read/app.ts`, // accepts .js, .jsx, .ts and .tsx files
      handler: 'handler', // defaults to 'handler'
      environment: {
        TEST_TABLE: table.tableName,
      },
    });

    const update = new lambda.NodejsFunction(this, 'update', {
      entry: `${LAMBDA_ASSETS_PATH}/update/app.ts`, // accepts .js, .jsx, .ts and .tsx files
      handler: 'handler', // defaults to 'handler'
      environment: {
        TEST_TABLE: table.tableName,
      },
    });

    table.grantWriteData(create);
    table.grantWriteData(del);
    table.grantReadData(read);
    table.grantWriteData(update);

  }
}

// for development, use account/region from cdk cli
const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new App();

new MyStack(app, 'my-stack-dev', { env: devEnv });
// new MyStack(app, 'my-stack-prod', { env: prodEnv });

app.synth();