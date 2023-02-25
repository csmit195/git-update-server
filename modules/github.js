const axios = require('axios');
const { github } = require('../config.json');

class Github {
    constructor() {
        this.personal_access_token = github.token;

        // Raw Method
        this.raw = axios.create({
            baseURL: 'https://raw.githubusercontent.com',
            headers: {
                'User-Agent': 'fifi',
                'Authorization': `token ${this.personal_access_token}`
            },
        });
        
        // API Method
        this.api = axios.create({
            baseURL: 'https://api.github.com',
            headers: {
                'User-Agent': 'github-proxy',
                'Authorization': `token ${this.personal_access_token}`
            },
        });
    }

    async getRawFile(repo, file) {
        try {
            const { data } = await this.raw.get(`${repo}/${file}`);
            return data;
        } catch (error) {
            if (error.response.status == 404) {
                return 'File not found';
            } else {
                return `Error ${error.response.status}`;
            }
        }
    }

    async getAPIFile(repo, file) {
        try {
            // truncate branch from repo
            const split = repo.split('/');
            const repoTruncated = `${split[0]}/${split[1]}`;
            const { data } = await this.api.get(`repos/${repoTruncated}/contents/${file}`);
            const decoded = Buffer.from(data.content, 'base64').toString('utf-8');
            return decoded;
        } catch (error) {
            if (error.response.status == 404) {
                return 'File not found';
            } else {
                return `Error ${error.response.status}`;
            }
        }
    }
}

module.exports = new Github();