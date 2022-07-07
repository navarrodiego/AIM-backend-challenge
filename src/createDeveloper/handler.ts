import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import axios from 'axios';
import { createDeveloper } from './businessLogic';

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
    if (event.body) {
        try {
            const username: string = JSON.parse(event.body).username;
            return await createDeveloper(username);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    if (error.response.status === 403) {
                        return {
                            statusCode: 403,
                            body: JSON.stringify({
                                error: 'Github API rate limit exceeded'
                            })
                        };
                    } else if (error.response.status === 404) {
                        return {
                            statusCode: 404,
                            body: JSON.stringify({
                                error: 'User not found'
                            })
                        };
                    }
                }
            }
            throw error;
        }
    }
    return {
        statusCode: 400,
        body: JSON.stringify({ error: 'No username provided' })
    };
};
