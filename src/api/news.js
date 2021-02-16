const axios = require('axios');
const apiKey = require('../../apiKey');

const instance = axios.create({
	baseURL: 'https://newsapi.org/v2'
});

instance.interceptors.request.use(
	config => {
		config.headers.Authorization = `Bearer ${apiKey}`;

		return config;
	},
	err => {
		return Promise.reject(err);
	}
);

module.exports = instance;
