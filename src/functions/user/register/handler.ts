import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import * as AWS from 'aws-sdk';
import { v4 as UUID } from 'uuid';
import bcrypt from 'bcryptjs';

const config = {
  region: process.env.AWS_REGION,
};
AWS.config.update(config);
const documentClient = new AWS.DynamoDB.DocumentClient();
import schema from './schema';

const register: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const { name, email, password } = event.body;

  await documentClient.put({
    TableName: process.env.DYNAMODB_USERS,
    Item: {
      id: UUID(),
      name,
      email,
      password: bcrypt.hashSync(password, 10)
    }
  }).promise();

  return formatJSONResponse({
    message: 'User create successfully'
  }, 201);
};

export const main = middyfy(register);
