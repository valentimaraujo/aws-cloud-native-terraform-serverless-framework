resource "aws_sns_topic_subscription" "email_subscriptions" {
  endpoint  = aws_sqs_queue.email.arn
  topic_arn = aws_sns_topic.notifications.arn
  protocol  = "sqs"
}

resource "aws_sns_topic_subscription" "sms_subscriptions" {
  endpoint  = aws_sqs_queue.sms.arn
  topic_arn = aws_sns_topic.notifications.arn
  protocol  = "sqs"
}
