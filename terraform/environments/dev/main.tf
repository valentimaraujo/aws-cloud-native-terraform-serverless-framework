data "aws_caller_identity" "current" {}

module "users" {
  source              = "../../infra/users"
  environment         = var.environment
  read_capacity       = var.read_capacity
  write_capacity      = var.write_capacity
  jwt_secret          = var.jwt_secret
  admin_user_name     = var.admin_user_name
  admin_user_email    = var.admin_user_email
  admin_user_role     = var.admin_user_role
  admin_user_id       = var.admin_user_id
  admin_user_password = var.admin_user_password
}

module "bookings" {
  source                = "../../infra/bookings"
  environment           = var.environment
  read_capacity         = var.read_capacity
  write_capacity        = var.write_capacity
  sns_notifications_arn = module.notifications.notifications_topic_arn
}

module "notifications" {
  source      = "../../infra/notifications"
  environment = var.environment
  account_id  = data.aws_caller_identity.current.account_id
  region      = var.region
}

