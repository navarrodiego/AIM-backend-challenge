import { APIGatewayProxyResult } from 'aws-lambda';
import { queryDevInfoFromDatabase } from './services/queryDevInfoFromDatabase';
import { developerInformation } from './types';

export const getDeveloperByUsername = async (
    username: string
): Promise<APIGatewayProxyResult> => {
    try {
        const developerInfo = await queryDevInfoFromDatabase(username);
        const response: developerInformation = { languages: {} } as developerInformation;
        if (developerInfo && developerInfo.Items && developerInfo.Items.length > 0) {
            developerInfo.Items.forEach(item => {
                if (item.SK.startsWith('LANG')) {
                    const language = item.SK.split('@')[1];
                    const proficiency = item.SK.split('@')[2];
                    response.languages[language] = `${proficiency.replace(/^0+/, '')}%`;
                } else {
                    const numberOfPublicRepos = item.SK.split('@')[1];
                    if (item.name) {
                        response.name = item.name;
                    }
                    if (item.location) {
                        response.location = item.location;
                    }
                    response.public_repos = Number(numberOfPublicRepos);
                }
            });
            return {
                statusCode: 200,
                body: JSON.stringify(response)
            };
        }
        return {
            statusCode: 404,
            body: JSON.stringify({
                error: `No developer found with username ${username}`
            })
        };

    } catch (error) {
        throw error;
    }
};
