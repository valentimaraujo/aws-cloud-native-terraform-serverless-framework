import { formatJSONResponse } from '@libs/api-gateway';
import * as AWS from 'aws-sdk';
import moment from 'moment';
import 'moment/locale/pt-br';
import {PromiseResult} from "aws-sdk/lib/request";

const config = {
  region: process.env.AWS_REGION,
};
AWS.config.update(config);
const convert = AWS.DynamoDB.Converter;
moment.locale('pt-br')

const SNS = new AWS.SNS();

const streamListener = async (event) => {
  const snsPromises: PromiseResult<any, any>[] = [];
  for (const record of event.Records) {
    if (record.eventName === 'INSERT') {
      const booking = convert.unmarshall(record.dynamodb.NewImage);
      const Message = `Reserva efetuada: o cliente ${booking.user.name} (${booking.user.email}) ` +
          `agendou um horário em: ${moment.unix(booking.date).format('LLLL')}`;

      snsPromises.push(SNS.publish({
          TopicArn: process.env.SNS_NOTIFICATIONS_TOPIC,
          Message
        }).promise()
      )
    }
  }
  await Promise.all(snsPromises);
  console.log('####### MENDAGENS ENVIADAS COM SUCESSO! #######');
  return formatJSONResponse({
    message: `stream listener succefully!`,
    event,
  });
};

export const main = streamListener;
