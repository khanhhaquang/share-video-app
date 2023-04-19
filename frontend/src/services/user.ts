import { IAuthData } from '@/types/user';
import axiosInstance from '@/utils/axios';

const UserService = {
	login: {
		key: 'user.login',
		call: ({ username, password }: { username: string; password: string }) =>
			axiosInstance.post<IAuthData>(`/user/login`, {
				username,
				password,
			}),
	},
	register: {
		key: 'user.register',
		call: ({ username, password }: { username: string; password: string }) =>
			axiosInstance.post(`/user/register`, {
				username,
				password,
			}),
	},
	getLoggedInUser: {
		key: 'user.getLoggedInUser',
		call: () => axiosInstance.get(`/user`),
	},
};

export default UserService;
