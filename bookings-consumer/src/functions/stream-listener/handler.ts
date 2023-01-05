import { formatJSONResponse } from '@libs/api-gateway';
import * as AWS from 'aws-sdk';
import moment from 'moment';
import 'moment/locale/pt-br'

const convert = AWS.DynamoDB.Converter;
moment.locale('pt-br')

const streamListener = async (event) => {
  for (const record of event.Records) {
    if (record.eventName === 'INSERT') {
      const booking = convert.unmarshall(record.dynamodb.NewImage);
      console.log(
          `Reserva efetuada: o cliente ${booking.user.name} (${booking.user.email}) ` +
          `agendou um horário em: ${moment.unix(booking.date).format('LLLL')}`
      )
    }
  }
  return formatJSONResponse({
    message: `stream listener succefully!`,
    event,
  });
};

export const main = streamListener;
