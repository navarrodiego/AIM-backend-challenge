import axios from 'axios';
import { DevInfo } from '../types';

export const getDevInfo = async (username: string): Promise<DevInfo> => {
    try {
        const response = await axios.get(
            `https://api.github.com/users/${username}`
        );
        const languagesUrls = await getLanguagesUrls(response.data.repos_url);
        const languages = await calculateLanguagesProficiency(languagesUrls);
        const developer = {
            username: response.data.login,
            public_repos: response.data.public_repos,
            name: response.data.name,
            location: response.data.location,
            languages: languages
        };
        return developer;
    } catch (error) {
        throw error;
    }
};

const getLanguagesUrls = async (reposUrl: string): Promise<string[]> => {
    try {
        const languagesUrls: string[] = [];
        const response = await axios.get(reposUrl);
        response.data.forEach((repo: { languages_url: string }) => {
            languagesUrls.push(repo.languages_url);
        });
        return languagesUrls;
    } catch (error) {
        throw error;
    }
};

const calculateLanguagesProficiency = async (
    languagesUrls: string[]
): Promise<{ [key: string]: number }> => {
    try {
        const arrayOfPromises = languagesUrls.map((url: string) => {
            return axios.get(url);
        });
        const numberOfRepos = languagesUrls.length;
        return Promise.all(arrayOfPromises)
            .then((responses) => {
                const languages: { [key: string]: number } = {};
                responses.forEach(
                    (response: { data: { [key: string]: number } }) => {
                        Object.keys(response.data).forEach(
                            (language: string) => {
                                if (languages[language]) {
                                    languages[language] += 1;
                                } else {
                                    languages[language] = 1;
                                }
                            }
                        );
                    }
                );
                for (const language in languages) {
                    languages[language] =
                        (languages[language] / numberOfRepos) * 100;
                }
                return languages;
            })
            .catch((error) => {
                throw error;
            });
    } catch (error) {
        throw error;
    }
};
