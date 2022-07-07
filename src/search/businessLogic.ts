import { APIGatewayProxyResult } from 'aws-lambda';
import { searchFromDatabase } from './services/searchFromDatabase';
import { searchResults } from './types';

export const search = async (
    language: string
): Promise<APIGatewayProxyResult> => {
    try {
        const query = await searchFromDatabase(language);
        const response: searchResults = [];
        if (query && query.Items && query.Items.length > 0) {
            query.Items.forEach(item => {
                const proficiency: string = item.GSI1SK.split('@')[0];
                const username: string = item.GSI1SK.split('@')[1];
                response.push([username, `${proficiency.replace(/^0+/, '')}%`]);
            });
        }
        return {
            statusCode: 200,
            body: JSON.stringify(response)
        };
    } catch (error) {
        throw error;
    }
};
