import { event } from '../../../../events/event';
import { mockClient } from 'aws-sdk-client-mock';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { QueryCommand } from '@aws-sdk/lib-dynamodb';
import { lambdaHandler } from '../../handler';
import { getDeveloperByUsername } from '../../businessLogic';

const ddbMock = mockClient(DynamoDBDocumentClient);

beforeEach(() => {
    ddbMock.reset();
    ddbMock.on(QueryCommand).resolves({});
    ddbMock.on(QueryCommand, {
        TableName: process.env.TABLE_NAME,
        KeyConditionExpression: 'PK = :pk',
        ExpressionAttributeValues: {
            ':pk': 'username'
        }
    }).resolves({
        Items: [
            {
                PK: 'username',
                SK: 'REPOS@0000007',
                name: 'name',
                location: 'location',
                public_repos: 7
            },
            {
                PK: 'username',
                SK: 'LANG@Javascript@0.9',
                GSI1PK: 'JavaScript',
                GSI1SK: '0.9@username'
            },
            {
                PK: 'username',
                SK: 'LANG@Java@0.8',
                GSI1PK: 'Java',
                GSI1SK: '0.8@username'
            }
        ]
    });
});

describe('Tests for lambda handler', () => {
    it('Returns 200 status code with valid username', async () => {
        const result = await lambdaHandler(event);
        expect(result.statusCode).toBe(200);
    });
    it('Returns 400 status code if no username is passed in path parameters', async () => {
        const emptyUsernameEvent = { ...event, pathParameters: {} };
        const result = await lambdaHandler(emptyUsernameEvent);
        expect(result.statusCode).toBe(400);
    });
});

describe('Tests for business logic', () => {
    it('Succeeds with valid username', async () => {
        const result = await getDeveloperByUsername('username');
        expect(result.statusCode).toEqual(200);
    });
    it('Returns 404 with not existing User', async () => {

        const result = await getDeveloperByUsername('thisUserDoesNotExist123456');
        expect(result.statusCode).toEqual(404);

    });
});
