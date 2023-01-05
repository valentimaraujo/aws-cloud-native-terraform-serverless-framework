resource "aws_iam_policy" "list_bookings_policy" {
  name = "${var.environment}-list-bookings-policy"
  policy = templatefile("${path.module}/templates/dynamodb-policy.json", {
    action   = "dynamodb:Scan",
    resource = aws_dynamodb_table.bookings.arn
  })
}
