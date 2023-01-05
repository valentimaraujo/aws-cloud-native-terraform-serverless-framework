import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  role: "${ssm:${self:custom.stage}-bookings-stream-consumer-iam-role}",
  events: [
    {
      stream: "${ssm:${self:custom.stage}-dynamodb-bookings-stream}"
    },
  ],
};
