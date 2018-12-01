exports.handler = async (message, context) => {
  console.log(message);
  console.log(context);
  if (message.path === '/error') {
    throw new Error('Intentionally throwing error');
  }
  const response = {
    statusCode: '200',
    body: `Success invoking version ${context.functionVersion}`,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  };

  return response;
};
