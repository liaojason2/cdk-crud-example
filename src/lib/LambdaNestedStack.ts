import * as path from 'path';
import { NestedStack, NestedStackProps, aws_lambda_nodejs as lambda, aws_dynamodb as dynamodb, aws_apigateway as apigateway } from 'aws-cdk-lib';
import { Construct } from 'constructs';


interface LambdaNestedStackProps extends NestedStackProps {
  readonly test_table: dynamodb.Table;
}

export class LambdaNestedStack extends NestedStack {
  constructor(scope: Construct, id: string, props?: LambdaNestedStackProps) {
    super(scope, id, props);

    const LAMBDA_ASSETS_PATH = path.resolve(__dirname, '../../lambda-assets');

    const create = new lambda.NodejsFunction(this, 'create', {
      entry: `${LAMBDA_ASSETS_PATH}/create/app.ts`, // accepts .js, .jsx, .ts and .tsx files
      handler: 'handler', // defaults to 'handler'
      environment: {
        TEST_TABLE: props!.test_table.tableName,
      },
    });

    const del = new lambda.NodejsFunction(this, 'delete', {
      entry: `${LAMBDA_ASSETS_PATH}/delete/app.ts`, // accepts .js, .jsx, .ts and .tsx files
      handler: 'handler', // defaults to 'handler'
      environment: {
        TEST_TABLE: props!.test_table.tableName,
      },
    });

    const read = new lambda.NodejsFunction(this, 'read', {
      entry: `${LAMBDA_ASSETS_PATH}/read/app.ts`, // accepts .js, .jsx, .ts and .tsx files
      handler: 'handler', // defaults to 'handler'
      environment: {
        TEST_TABLE: props!.test_table.tableName,
      },
    });

    const update = new lambda.NodejsFunction(this, 'update', {
      entry: `${LAMBDA_ASSETS_PATH}/update/app.ts`, // accepts .js, .jsx, .ts and .tsx files
      handler: 'handler｀', // defaults to 'handler'
      environment: {
        TEST_TABLE: props!.test_table.tableName,
      },
    });

    props?.test_table.grantWriteData(create);
    props?.test_table.grantWriteData(del);
    props?.test_table.grantWriteData(read);
    props?.test_table.grantWriteData(update);


  }
}
