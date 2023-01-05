import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import * as AWS from 'aws-sdk';

const config = {
  region: process.env.AWS_REGION,
};
AWS.config.update(config);
const documentClient = new AWS.DynamoDB.DocumentClient();
import schema from './schema';

const fetchAll: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const { role } = event.requestContext.authorizer;

  if (role === 'ADMIN') {
    const result = await documentClient.scan({
      TableName: process.env.DYNAMODB_BOOKINGS,
    }).promise();

    return formatJSONResponse({
      data: result.Items
    }, 201);
  }

  return formatJSONResponse({
    message: 'User is not authorized to access this resource(necessary role: ADMIN)'
  }, 403);
};

export const main = middyfy(fetchAll);
