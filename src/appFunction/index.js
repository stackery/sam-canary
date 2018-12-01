exports.handler = async (message, context) => {
  console.log(message);
  console.log(context);
  const response = {
    statusCode: '200',
    body: '<h1>Success</h1>',
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  };

  return response;
};
