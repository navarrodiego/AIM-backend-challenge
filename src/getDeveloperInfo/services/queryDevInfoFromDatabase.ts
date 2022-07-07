import { QueryCommand } from '@aws-sdk/lib-dynamodb';
import { ddbDocClient } from '../../shared/ddbDocClient';


export const queryDevInfoFromDatabase = async (username: string) => {
    try {
        const params = {
            TableName: process.env.TABLE_NAME,
            KeyConditionExpression: 'PK = :pk',
            ExpressionAttributeValues: {
                ':pk': username
            }
        }
        return await ddbDocClient.send(new QueryCommand(params));
    } catch (error) {
        throw error;
    }
}