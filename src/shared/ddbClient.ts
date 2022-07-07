import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { NodeHttpHandler } from '@aws-sdk/node-http-handler';

// En este archivo se crea un cliente de DynamoDB. Se aprovecha el caché porque antes de crear un nuevo cliente, se verifica que no exista un cliente ya creado.
// Si ya existe un cliente creado, se reduce la latencia en la llamadas a la API porque no es necesario establecer una nueva conexión con DynamoDB.

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
