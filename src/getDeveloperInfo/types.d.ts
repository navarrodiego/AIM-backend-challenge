export type developerInformation = {
    name?: string,
    location?: string,
    public_repos: number,
    languages: {
        [language: string]: string
    }
}