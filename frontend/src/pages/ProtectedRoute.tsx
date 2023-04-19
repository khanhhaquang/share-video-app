import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';

import { useAuthContext } from '@/contexts/Auth';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
	const { isAuthenticated } = useAuthContext();
	const router = useRouter();

	useEffect(() => {
		if (!isAuthenticated) {
			router.replace('/');
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAuthenticated]);

	if (!isAuthenticated) {
		return null;
	}

	return <>{children}</>;
};

export default ProtectedRoute;
