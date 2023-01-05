resource "aws_dynamodb_table" "users" {
  hash_key = "id"
  name     = "${var.environment}-users"
  attribute {
    name = "id"
    type = "S"
  }
  attribute {
    name = "email"
    type = "S"
  }
  global_secondary_index {
    hash_key        = "email"
    name            = "${var.environment}-email-gsi"
    projection_type = "ALL"
    write_capacity  = var.write_capacity
    read_capacity   = var.read_capacity
  }
  write_capacity = var.write_capacity
  read_capacity  = var.read_capacity
}

resource "aws_dynamodb_table_item" "admin-user" {
  hash_key   = aws_dynamodb_table.users.hash_key
  table_name = aws_dynamodb_table.users.name
  item       = <<ITEM
  {
    "id": {"S": "${var.admin_user_id}"},
    "email": {"S": "${var.admin_user_email}"},
    "password": {"S": "${var.admin_user_password}"},
    "role": {"S": "${var.admin_user_role}"},
    "name": {"S": "${var.admin_user_name}"}
  }
  ITEM
}

resource "aws_ssm_parameter" "dynamodb_users_table" {
  name  = "${var.environment}-dynamodb-users-table"
  type  = "String"
  value = aws_dynamodb_table.users.name
}

resource "aws_ssm_parameter" "email-gsi" {
  name  = "${var.environment}-email-gsi"
  type  = "String"
  value = "${var.environment}-email-gsi"
}
