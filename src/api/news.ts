import axios from 'axios';
import { apiKey } from '../config';

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

export default instance;
