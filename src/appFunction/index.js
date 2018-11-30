exports.handler = async message => {
  console.log(message);
  const response = {
    statusCode: '200',
    body: '<h1>Success</h1>',
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  };

  return response;
};
