import { APIGatewayProxyEvent } from 'aws-lambda';

export const event: APIGatewayProxyEvent = {
    resource: '/developers',
    path: '/developers',
    httpMethod: 'POST',
    headers: {
        Accept: '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Content-Type': 'text/plain',
        Host: '5u88gkdny8.execute-api.sa-east-1.amazonaws.com',
        'Postman-Token': 'e57e32f1-873c-4c17-9301-fbc7c3f0a453',
        'User-Agent': 'PostmanRuntime/7.29.0',
        'X-Amzn-Trace-Id': 'Root=1-62c63771-065483855a0e8e816589eb3f',
        'X-Forwarded-For': '181.43.194.155',
        'X-Forwarded-Port': '443',
        'X-Forwarded-Proto': 'https'
    },
    multiValueHeaders: {
        Accept: ['*/*'],
        'Accept-Encoding': ['gzip, deflate, br'],
        'Content-Type': ['text/plain'],
        Host: ['5u88gkdny8.execute-api.sa-east-1.amazonaws.com'],
        'Postman-Token': ['e57e32f1-873c-4c17-9301-fbc7c3f0a453'],
        'User-Agent': ['PostmanRuntime/7.29.0'],
        'X-Amzn-Trace-Id': ['Root=1-62c63771-065483855a0e8e816589eb3f'],
        'X-Forwarded-For': ['181.43.194.155'],
        'X-Forwarded-Port': ['443'],
        'X-Forwarded-Proto': ['https']
    },
    queryStringParameters: null,
    multiValueQueryStringParameters: null,
    pathParameters: {
        username: 'username',
        language: 'Javascript'
    },
    stageVariables: null,
    requestContext: {
        authorizer: {},
        resourceId: 'd6sx5e',
        resourcePath: '/developers',
        httpMethod: 'POST',
        extendedRequestId: 'U32ZsEGEmjQFtjw=',
        requestTime: '07/Jul/2022:01:31:29 +0000',
        path: '/dev/developers',
        accountId: '740305258303',
        protocol: 'HTTP/1.1',
        stage: 'dev',
        domainPrefix: '5u88gkdny8',
        requestTimeEpoch: 1657157489078,
        requestId: '83a7af56-74ff-4b68-9d29-2850faa3d1ec',
        identity: {
            apiKey: '',
            apiKeyId: '',
            clientCert: null,
            cognitoIdentityPoolId: null,
            accountId: null,
            cognitoIdentityId: null,
            caller: null,
            sourceIp: '181.43.194.155',
            principalOrgId: null,
            accessKey: null,
            cognitoAuthenticationType: null,
            cognitoAuthenticationProvider: null,
            userArn: null,
            userAgent: 'PostmanRuntime/7.29.0',
            user: null
        },
        domainName: '5u88gkdny8.execute-api.sa-east-1.amazonaws.com',
        apiId: '5u88gkdny8'
    },
    body: '{\n    "username": "sindresorhus"\n}',
    isBase64Encoded: false
};
