import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getDeveloperByUsername } from './businessLogic';

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

export const lambdaHandler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    if (event.pathParameters && event.pathParameters.username) {
        try {
            const username: string = event.pathParameters.username;
            return await getDeveloperByUsername(username);
        } catch (error) {
            throw error;
        }
    }
    return {
        statusCode: 400,
        body: JSON.stringify({ error: 'No username provided' })
    };
};
