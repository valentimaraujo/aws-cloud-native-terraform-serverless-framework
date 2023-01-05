resource "aws_iam_policy" "create_booking_policy" {
  name = "${var.environment}-create-booking-policy"
  policy = templatefile("${path.module}/templates/dynamodb-policy.json", {
    action   = "dynamodb:PutItem",
    resource = aws_dynamodb_table.bookings.arn
  })
}
