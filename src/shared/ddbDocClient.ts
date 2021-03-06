import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { getClient } from './ddbClient';

// En este archivo se crea un cliente de DynamoDBDocument, que es una abstracción sobre DynamoDB para hacer llamadas más legibles.

const marshallOptions = {
    // Whether to automatically convert empty strings, blobs, and sets to `null`.
    convertEmptyValues: false, // false, by default.
    // Whether to remove undefined values while marshalling.
    removeUndefinedValues: false, // false, by default.
    // Whether to convert typeof object to map attribute.
    convertClassInstanceToMap: false // false, by default.
};

const unmarshallOptions = {
    // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
    wrapNumbers: false // false, by default.
};

const translateConfig = { marshallOptions, unmarshallOptions };

const ddbClient = getClient();
export const ddbDocClient = DynamoDBDocumentClient.from(
    ddbClient,
    translateConfig
);
