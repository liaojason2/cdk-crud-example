const { awscdk } = require('projen');
const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: '2.1.0',
  defaultReleaseBranch: 'main',
  name: 'test',
  deps: [
    'aws-cdk-lib',
    '@aws-sdk/client-dynamodb',
    '@aws-sdk/lib-dynamodb',
    '@softchef/lambda-events',
  ],
  /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
  // release: undefined,      /* Add release management to this project. */
  tsconfigDev: {
    include: [
      'lambda-assets/**/*.ts',
    ],
  },
});
project.synth();