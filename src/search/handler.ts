import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { search } from './businessLogic';

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
    if (event.pathParameters && event.pathParameters.language) {
        try {
            const language: string = event.pathParameters.language;
            return await search(language);
        } catch (error) {
            throw error;
        }
    }
    return {
        statusCode: 400,
        body: JSON.stringify({ error: 'No language provided' })
    };
};
