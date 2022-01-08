import { NestedStack, NestedStackProps, aws_dynamodb as dynamodb, RemovalPolicy } from 'aws-cdk-lib';
import { Construct } from 'constructs';


export class TableNestedStack extends NestedStack {
  public readonly test_table: dynamodb.Table;

  constructor(scope: Construct, id: string, props?: NestedStackProps) {
    super(scope, id, props);
    this.test_table = new dynamodb.Table(this, 'test_table', {
      partitionKey: {
        name: 'username',
        type: dynamodb.AttributeType.STRING,
      },
      removalPolicy: RemovalPolicy.DESTROY,
    });
  }
}
