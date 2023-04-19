import { IAuthData } from '@/types/user';
import { setAccessToken } from '@/utils/storage';
import { ReactNode, createContext, useContext, useEffect, useMemo, useState, useSyncExternalStore } from 'react';

const AuthContext = createContext({
	isAuthenticating: false,
	isAuthenticated: false,
	username: '',
	userId: '',
	accessToken: '',
	setUserAuthInfo: (data: IAuthData) => {},
	handleLogout: () => {},
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [isAuthenticating, setIsAuthenticating] = useState(false);

	const [authData, setAuthData] = useState({
		accessToken: '',
		userId: '',
		username: '',
	});

	const setUserAuthInfo = (data: IAuthData) => {
		setAccessToken(data.accessToken);
		setAuthData({
			...data,
		});
	};

	const handleLogout = () => {
		setAccessToken('');
		setAuthData({
			username: '',
			userId: '',
			accessToken: '',
		});
	};

	const isAuthenticated = useMemo(() => {
		return !!authData.accessToken && !!authData.username && !!authData.userId;
	}, [authData.accessToken, authData.userId, authData.username]);

	useEffect(() => {}, []);

	return (
		<AuthContext.Provider value={{ isAuthenticating, isAuthenticated, handleLogout, setUserAuthInfo, ...authData }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
export { AuthContext, AuthProvider };

export const useAuthContext = () => {
	const data = useContext(AuthContext);

	if (!data) {
		throw Error('Please use this hook inside AuthProvider');
	}

	return data;
};
