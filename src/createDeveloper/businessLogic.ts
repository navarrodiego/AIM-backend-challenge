import { APIGatewayProxyResult } from 'aws-lambda';
import { addDevToDatabase } from './services/addDevToDatabase';
import { getDevInfo } from './services/githubApi';

export const createDeveloper = async (
    username: string
): Promise<APIGatewayProxyResult> => {
    try {
        const developer = await getDevInfo(username);
        await addDevToDatabase(developer);
        return {
            statusCode: 201,
            body: JSON.stringify({ message: 'Success' })
        };
    } catch (error) {
        throw error;
    }
};
