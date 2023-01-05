resource "aws_iam_policy" "bookings_stream_consumer_policy" {
  name = "${var.environment}-bookings-stream-consumer-policy"
  policy = templatefile("${path.module}/templates/dynamodb-policy.json", {
    action = join("\",\"", [
      "dynamodb:ListStreams",
      "dynamodb:DescribeStream",
      "dynamodb:GetShardIterator",
      "dynamodb:GetRecords",
    ]),
    resource = "${aws_dynamodb_table.bookings.stream_arn}"
  })
}
