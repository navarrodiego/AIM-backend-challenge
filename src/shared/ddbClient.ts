import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { NodeHttpHandler } from '@aws-sdk/node-http-handler';

let client: DynamoDBClient | null = null;

export const getClient = (): DynamoDBClient => {
    if (client) return client;
    client = new DynamoDBClient({
        requestHandler: new NodeHttpHandler({
            socketTimeout: 1000,
            connectionTimeout: 1000
        })
    });
    return client;
};
