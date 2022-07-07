import { TransactWriteCommand } from '@aws-sdk/lib-dynamodb';
import { ddbDocClient } from '../../shared/ddbDocClient';
import {
    DevInfo,
    DevInfoDynamoDB,
    DevLanguagesInfoDynamoDB,
    TransactionItem
} from '../types';

export const addDevToDatabase = async (item: DevInfo) => {
    try {
        const publicRepos = item.public_repos;
        // Para poder ordenar los resultados de manera descendente, se agregan ceros al principio del número de repositorios públicos.
        const publicReposWithLeadingZeros = ('0000000' + publicRepos).slice(-7);
        const devInfoDynamoDB: DevInfoDynamoDB = {
            PK: item.username,
            SK: `REPOS@${publicReposWithLeadingZeros}`
        };
        if (item.name) {
            devInfoDynamoDB.name = item.name;
        }
        if (item.location) {
            devInfoDynamoDB.location = item.location;
        }
        const transactions: TransactionItem = [
            {
                Put: {
                    TableName: process.env.TABLE_NAME,
                    Item: devInfoDynamoDB
                }
            }
        ];
        for (const language in item.languages) {
            const proficiency = item.languages[language].toFixed(2);
            // Para poder ordenar los resultados de manera descendente, se agregan ceros al principio de la proficiency.
            const proficiencyWithLeadingZeros = ('000.00' + proficiency).slice(
                -6
            );
            const devLanguagesInfoDynamoDB: DevLanguagesInfoDynamoDB = {
                PK: item.username,
                SK: `LANG@${language}@${item.languages[language]}`,
                GSI1PK: language,
                GSI1SK: `${proficiencyWithLeadingZeros}@${item.username}`
            };
            transactions.push({
                Put: {
                    TableName: process.env.TABLE_NAME,
                    Item: devLanguagesInfoDynamoDB
                }
            });
        }
        const params = {
            TransactItems: transactions
        };
        return await ddbDocClient.send(new TransactWriteCommand(params));
    } catch (error) {
        throw error;
    }
};
