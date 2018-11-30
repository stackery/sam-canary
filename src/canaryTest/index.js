const aws = require('aws-sdk');
const codedeploy = new aws.CodeDeploy({ apiVersion: '2014-10-06' });
const lambda = new aws.Lambda({ apiVersion: '2015-03-31' });

exports.handler = async event => {
  console.log('Entering PreTraffic Hook!');
  console.log(JSON.stringify(event));

  // Read the DeploymentId from the event payload.
  const deploymentId = event.DeploymentId;
  console.log(deploymentId);

  // Read the LifecycleEventHookExecutionId from the event payload
  const lifecycleEventHookExecutionId = event.LifecycleEventHookExecutionId;
  console.log(lifecycleEventHookExecutionId);

  /*
      [Perform validation or prewarming steps here]
    */
  const functionParams = {
    FunctionName: process.env.FUNCTION_NAME_VERSION, /* required */
    InvocationType: 'RequestResponse',
    Payload: '{"canary": true}' /* Strings will be Base-64 encoded on your behalf */
  };
  await lambda.invoke(functionParams).promise();
  // Prepare the validation test results with the deploymentId and
  // the lifecycleEventHookExecutionId for AWS CodeDeploy.
  const params = {
    deploymentId: deploymentId,
    lifecycleEventHookExecutionId: lifecycleEventHookExecutionId,
    status: 'Succeeded' // status can be 'Succeeded' or 'Failed'
  };

  // Pass AWS CodeDeploy the prepared validation test results.
  await codedeploy.putLifecycleEventHookExecutionStatus(params).promise();
};
