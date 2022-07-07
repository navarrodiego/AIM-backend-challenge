import { event } from '../../../../events/event';
import * as exampleResponseTransactionWrite from '../../../../mocks/transactionWriteResponse.json';
import { mockClient } from 'aws-sdk-client-mock';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { TransactWriteCommand } from '@aws-sdk/lib-dynamodb';
import { lambdaHandler } from '../../handler';
import { createDeveloper } from '../../businessLogic';

const ddbMock = mockClient(DynamoDBDocumentClient);

beforeEach(() => {
    ddbMock.reset();
    ddbMock.on(TransactWriteCommand).resolves(exampleResponseTransactionWrite);
});

describe('Tests for lambda handler', () => {
    it('Returns 201 status code with valid username', async () => {
        const result = await lambdaHandler(event);
        expect(result.statusCode).toBe(201);
    });
    it('Returns 400 status code if body is empty', async () => {
        let emptyBodyEvent = { ...event, body: '' };
        const result = await lambdaHandler(emptyBodyEvent);
        expect(result.statusCode).toBe(400);
    });
});

describe('Tests for business logic', () => {
    it('Succeeds with valid username', async () => {
        const result = await createDeveloper('exampleUsername');
        expect(result.statusCode).toEqual(201);
        expect(result.body).toEqual(
            JSON.stringify({
                message: 'Success'
            })
        );
    });
    it('Returns 404 with not existing User', async () => {
        try {
            const result = await createDeveloper('thisUserDoesNotExist123456');
            expect(true).toEqual(false);
        } catch (error) {
            expect(error.response.status).toEqual(404);
        }
    });
});
