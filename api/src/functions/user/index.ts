import { handlerPath } from '@libs/handler-resolver';
import userRegisterSchema from './register/schema';
import userLoginSchema from './login/schema';

const userRegister = {
    handler: `${handlerPath(__dirname)}/register/handler.main`,
    role: '${ssm:${self:custom.stage}-register-iam-role}',
    environment: {
        DYNAMODB_USERS: '${ssm:${self:custom.stage}-dynamodb-users-table}'
    },
    events: [{
        http: {
            method: 'post',
            path: 'register',
            request: {
                schemas: {
                    'application/json': userRegisterSchema,
                },
            },
        },
    },],
};

const userLogin = {
    handler: `${handlerPath(__dirname)}/login/handler.main`,
    role: '${ssm:${self:custom.stage}-login-iam-role}',
    environment: {
        DYNAMODB_USERS: '${ssm:${self:custom.stage}-dynamodb-users-table}',
        JWT_SECRET: '${ssm:${self:custom.stage}-jwt-secret}',
        EMAIL_GSI: '${ssm:${self:custom.stage}-email-gsi}',
    },
    events: [{
        http: {
            method: 'post',
            path: 'login',
            request: {
                schemas: {
                    'application/json': userLoginSchema,
                },
            },
        },
    },],
};

const userAuthorizer = {
    handler: `${handlerPath(__dirname)}/authorizer/handler.main`,
    environment: {
        JWT_SECRET: '${ssm:${self:custom.stage}-jwt-secret}',
    }
};

export {
    userRegister,
    userLogin,
    userAuthorizer
}
