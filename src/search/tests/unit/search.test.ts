import { event } from '../../../../events/event';
import { mockClient } from 'aws-sdk-client-mock';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { QueryCommand } from '@aws-sdk/lib-dynamodb';
import { lambdaHandler } from '../../handler';
import { search } from '../../businessLogic';

const ddbMock = mockClient(DynamoDBDocumentClient);

beforeEach(() => {
    ddbMock.reset();
    ddbMock.on(QueryCommand).resolves({
        Items: []
    });
    ddbMock.on(QueryCommand, {
        TableName: process.env.TABLE_NAME,
        IndexName: "search-by-language",
        KeyConditionExpression: "GSI1PK = :language",
        ExpressionAttributeValues: {
            ":language": 'Javascript'
        }
    }).resolves({
        Items: [
            {
                GSI1PK: 'Javascript',
                GSI1SK: '36.67@navarrodiego'
            },
            {
                GSI1PK: 'Javascript',
                GSI1SK: '26.67@username'
            }
        ]
    });
});

describe('Tests for lambda handler', () => {
    it('Returns 200 status code with valid language', async () => {
        const result = await lambdaHandler(event);
        expect(result.statusCode).toBe(200);
    });
    it('Returns 400 status code if no language is passed in path parameters', async () => {
        const emptyLanguageEvent = { ...event, pathParameters: {} };
        const result = await lambdaHandler(emptyLanguageEvent);
        expect(result.statusCode).toBe(400);
    });
});

describe('Tests for business logic', () => {
    it('Succeeds with existing language', async () => {
        const result = await search('Javascript');
        expect(result.statusCode).toEqual(200);
        expect(result.body).toEqual(JSON.stringify([
            ['navarrodiego', '36.67%'],
            ['username', '26.67%']
        ]));
    });
    it('Returns 404 with not existing language', async () => {

        const result = await search('thisLanguageDoesNotExist');
        expect(result.statusCode).toEqual(200);
        expect(result.body).toEqual(JSON.stringify([]));

    });
});
