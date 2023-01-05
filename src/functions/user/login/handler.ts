import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import * as AWS from 'aws-sdk';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import schema from './schema';

const config = {
  region: process.env.AWS_REGION,
};
AWS.config.update(config);
const documentClient = new AWS.DynamoDB.DocumentClient();

const login: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const { email, password } = event.body;
  const params = {
    TableName: process.env.DYNAMODB_USERS,
    IndexName: process.env.EMAIL_GSI,
    KeyConditionExpression: 'email = :email',
    ExpressionAttributeValues: {
      ':email': email
    }
  }
  const data = await documentClient.query(params).promise();
  const user = data.Items[0];
  if(user) {
    if(bcrypt.compareSync(password, user.password)) {
      delete user.password;
      return formatJSONResponse({
        token: jwt.sign(user, process.env.JWT_SECRET)
      }, 200);
    }
  }

  return formatJSONResponse({
    message: 'Unauthorized'
  }, 401);
};

export const main = middyfy(login);
