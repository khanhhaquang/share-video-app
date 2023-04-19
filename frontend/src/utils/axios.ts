import axios, { AxiosError, AxiosHeaders } from 'axios';
import { getAccessToken } from './storage';

export interface IResponseError {
	message?: string;
}

const axiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_DOMAIN,
	headers: {
		accept: 'application/json',
		'Cache-Control': 'no-cache',
		'Content-Type': 'application/json',
	},
});

axiosInstance.interceptors.request.use(
	async (config) => {
		const accessToken = getAccessToken();
		if (config.headers) {
			(config.headers as AxiosHeaders).set('Authorization', 'Bearer ' + accessToken);
		}

		return config;
	},
	(error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
	(res) => res.data,
	(err: AxiosError) => {
		return Promise.reject(err?.response?.data as IResponseError);
	}
);

export default axiosInstance;
