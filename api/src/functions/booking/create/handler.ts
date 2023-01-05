import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import * as AWS from 'aws-sdk';
import { v4 as UUID } from 'uuid';

const config = {
  region: process.env.AWS_REGION,
};
AWS.config.update(config);
const documentClient = new AWS.DynamoDB.DocumentClient();
import schema from './schema';

const register: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const { authorizer } = event.requestContext;

  await documentClient.put({
    TableName: process.env.DYNAMODB_BOOKINGS,
    Item: {
      id: UUID(),
      user: authorizer,
      date: event.body.date
    }
  }).promise();

  return formatJSONResponse({
    message: 'Booking create successfully'
  }, 201);
};

export const main = middyfy(register);
