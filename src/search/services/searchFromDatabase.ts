import { QueryCommand } from '@aws-sdk/lib-dynamodb';
import { ddbDocClient } from '../../shared/ddbDocClient';

export const searchFromDatabase = async (language: string) => {
    try {
        // Se crea una consulta que busca en la base de datos todos los registros que contengan el lenguaje especificado.
        // Esta consulta se hace a un índice de la tabla (GSI)
        // El parámetro ScanIndexForward ordena los resultados de manera descendente, para obtener primero los usuarios con mayor proficiency.
        const params = {
            TableName: process.env.TABLE_NAME,
            IndexName: 'search-by-language',
            KeyConditionExpression: 'GSI1PK = :language',
            ExpressionAttributeValues: {
                ':language': language
            },
            ScanIndexForward: false
        };
        return await ddbDocClient.send(new QueryCommand(params));
    } catch (error) {
        throw error;
    }
};
