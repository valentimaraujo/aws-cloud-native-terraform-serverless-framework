import jwt from 'jsonwebtoken';

const authorizer = async (event, context, callback) => {
  const token = event.authorizationToken;
  try{
    const user = jwt.verify(token, process.env.JWT_SECRET);
    callback(null, generatePolicy('user', 'Allow', event.methodArn, user));
  } catch (e) {
    console.log(e)
    callback(null, generatePolicy('user', 'Deny', event.methodArn));
  }
};

const generatePolicy = (principalId, effect, resource, user = null) => {
    const authResponse = {};
    authResponse.principalId = principalId;

    let tmp = resource.split(':');
    const apiGatewayArnTmp = tmp[5].split('/');
    tmp = tmp.slice(0, -1);
    const resourceNotCached = tmp.join(':') + ':' + apiGatewayArnTmp[0] + '/*/*';

    if (effect && resourceNotCached) {
        const policyDocument = {};
        policyDocument.Version = '2012-10-17';
        policyDocument.Statement = [];
        const statementOne = {};
        statementOne.Action = 'execute-api:Invoke';
        statementOne.Effect = effect;
        statementOne.Resource = resourceNotCached;
        policyDocument.Statement[0] = statementOne;
        authResponse.policyDocument = policyDocument;
    }

    if (user) {
        authResponse.context = user;
    }

    return authResponse;
}

export const main = authorizer;
