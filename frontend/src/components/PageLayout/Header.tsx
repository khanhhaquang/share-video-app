import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';

import { useAuthContext } from '@/contexts/Auth';
import UserService from '@/services/user';
import { IResponseError } from '@/utils/axios';

import Button from '../Button';
import Input from '../Input';

export const HeaderLogo = () => {
	return (
		<Link href='/' className='font-bold uppercase'>
			Share video
		</Link>
	);
};

export const HeaderLoggedInSection = () => {
	const router = useRouter();
	const { username, handleLogout } = useAuthContext();

	return (
		<div className='flex items-center justify-end gap-x-2'>
			<h2 className='mr-4'>
				Welcome <b>@{username}</b>
			</h2>
			<Button className='p-2 w-fit' onClick={() => router.push('/share')}>
				Share video
			</Button>
			<Button className='p-2 w-20' onClick={() => handleLogout()}>
				Logout
			</Button>
		</div>
	);
};

export const HeaderAuthForm = () => {
	const { setUserAuthInfo, isAuthenticated } = useAuthContext();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const [isSubmitting, setIsSubmitting] = useState(false);

	const isSubmitDisabled = isSubmitting || !username || !password;

	const handleLogin = async () => {
		try {
			setIsSubmitting(true);
			const data = await UserService.login.call({ username, password });
			setUserAuthInfo(data.data);
		} catch (error) {
			alert((error as IResponseError)?.message);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleRegister = async () => {
		try {
			setIsSubmitting(true);
			const data = await UserService.register.call({ username, password });
			if (data) return handleLogin();
		} catch (error) {
			alert((error as IResponseError)?.message);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className='flex items-center gap-x-4 justify-end'>
			{isAuthenticated ? (
				<HeaderLoggedInSection />
			) : (
				<>
					<Input
						type='username'
						value={username}
						placeholder='Username'
						onChange={(e) => setUsername((e.target as HTMLInputElement).value)}
					/>
					<Input
						type='password'
						value={password}
						placeholder='Password'
						onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
					/>

					<div className='flex items-center gap-x-2 justify-end'>
						<Button disabled={isSubmitDisabled} className='p-2 w-20' onClick={() => handleLogin()}>
							Login
						</Button>
						<Button disabled={isSubmitDisabled} className='p-2 w-20' onClick={() => handleRegister()}>
							Register
						</Button>
					</div>
				</>
			)}
		</div>
	);
};

const Header = () => {
	return (
		<header className='fixed z-10 inset-x-0 top-0 h-pageHeader w-screen flex items-center justify-center bg-white border-b border-black'>
			<div className='w-pageInner flex justify-between items-center'>
				<HeaderLogo />
				<HeaderAuthForm />
			</div>
		</header>
	);
};

export default Header;
