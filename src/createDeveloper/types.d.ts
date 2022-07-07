export type DevInfo = {
    username: string;
    name: string;
    public_repos: number;
    location: string;
    languages: { [key: string]: number };
};

export type DevInfoDynamoDB = {
    PK: string; // username
    SK: string; // REPOS@public_repos
    name?: string;
    location?: string;
};

export type DevLanguagesInfoDynamoDB = {
    PK: string; // username
    SK: string; // LANG@language@proficiency
    GSI1PK: string; // language
    GSI1SK: string; // proficiency@username
};

export type TransactionItem = {
    Put: {
        TableName: string | undefined;
        Item: DevInfoDynamoDB | DevLanguagesInfoDynamoDB;
    };
}[];
