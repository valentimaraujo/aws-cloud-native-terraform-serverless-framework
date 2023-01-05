import { formatJSONResponse } from '@libs/api-gateway';
import * as AWS from 'aws-sdk';

const convert = AWS.DynamoDB.Converter;

const streamListener = async (event) => {
  for (const record of event.Records) {
    console.log('JSON parse', convert.unmarshall(record.dynamodb.NewImage))
  }
  return formatJSONResponse({
    message: `stream listener succefully!`,
    event,
  });
};

export const main = streamListener;
