import { handlerPath } from '@libs/handler-resolver';
import bookingFetchAllSchema from './fetchAll/schema';

const bookingCreate = {
    handler: `${handlerPath(__dirname)}/create/handler.main`,
    role: '${ssm:${self:custom.stage}-create-booking-iam-role}',
    environment: {
        DYNAMODB_BOOKINGS: '${ssm:${self:custom.stage}-dynamodb-bookings-table}'
    },
    events: [{
        http: {
            method: 'post',
            path: 'bookings',
            authorizer: 'userAuthorizer',
            request: {
                schemas: {
                    'application/json': bookingFetchAllSchema,
                },
            },
        },
    }],
};

const bookingFetchAll = {
    handler: `${handlerPath(__dirname)}/fetchAll/handler.main`,
    role: '${ssm:${self:custom.stage}-list-bookings-iam-role}',
    environment: {
        DYNAMODB_BOOKINGS: '${ssm:${self:custom.stage}-dynamodb-bookings-table}'
    },
    events: [{
        http: {
            method: 'get',
            path: 'bookings',
            authorizer: 'userAuthorizer',
        },
    }],
};

export {
    bookingCreate,
    bookingFetchAll
}
