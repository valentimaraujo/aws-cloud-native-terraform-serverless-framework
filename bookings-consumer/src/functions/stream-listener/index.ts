import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  role: "${ssm:${self:custom.stage}-bookings-stream-consumer-iam-role}",
  environment: {
    SNS_NOTIFICATIONS_TOPIC: "${ssm:${self:custom.stage}-notifications-topic}"
  },
  events: [
    {
      stream: "${ssm:${self:custom.stage}-dynamodb-bookings-stream}"
    },
  ],
};
