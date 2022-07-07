import { QueryCommand } from '@aws-sdk/lib-dynamodb';
import { ddbDocClient } from '../../shared/ddbDocClient';

export const searchFromDatabase = async (language: string) => {
    try {
        const params = {
            TableName: process.env.TABLE_NAME,
            IndexName: "search-by-language",
            KeyConditionExpression: "GSI1PK = :language",
            ExpressionAttributeValues: {
                ":language": language
            },
            ScanIndexForward: false
        };
        return await ddbDocClient.send(new QueryCommand(params));
    } catch (error) {
        throw error;
    }
}