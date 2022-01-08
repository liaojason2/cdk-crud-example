import { App, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {
  TableNestedStack,
  LambdaNestedStack,
} from './lib';

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);
    const table = new TableNestedStack(this, 'TableNestedStack');
    new LambdaNestedStack(this, 'LambdaNestedStack', {
      test_table: table.test_table,
    });
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