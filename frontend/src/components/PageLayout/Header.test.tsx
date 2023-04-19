import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Header, { HeaderLogo, HeaderLoggedInSection, HeaderAuthForm } from './Header';
import * as Auth from '@/contexts/Auth';

describe('PageHeader', () => {
	it('renders the header element', () => {
		const { getByRole } = render(<Header />);
		expect(getByRole('banner')).toBeInTheDocument();
	});

	it('renders the logo component', () => {
		const { getByText } = render(<Header />);
		expect(getByText('Share video')).toBeInTheDocument();
	});

	it('renders the auth form component when unauthenticated', () => {
		const mockAuthContext = {
			isAuthenticating: false,
			isAuthenticated: false,
			userId: '',
			username: '',
			accessToken: '',
			handleLogout: jest.fn(),
			setUserAuthInfo: jest.fn(),
		};

		const { getByText } = render(
			<Auth.AuthContext.Provider value={{ ...mockAuthContext }}>
				<Header />
			</Auth.AuthContext.Provider>
		);
		expect(getByText('Login')).toBeInTheDocument();
		expect(getByText('Register')).toBeInTheDocument();
	});
});

describe('PageHeader/HeaderLogo', () => {
	it('renders the logo text', () => {
		render(<HeaderLogo />);
		const logoText = screen.getByText('Share video');
		expect(logoText).toBeInTheDocument();
	});

	it('links to the homepage', () => {
		render(<HeaderLogo />);
		const logoLink = screen.getByRole('link');
		expect(logoLink).toHaveAttribute('href', '/');
	});
});

const useRouter = jest.spyOn(require('next/router'), 'useRouter');

describe('PageHeader/HeaderLoggedInSection', () => {
	const mockRouter = {
		push: jest.fn(),
	};
	const mockLogout = jest.fn();

	const mockAuthContext = {
		isAuthenticating: false,
		isAuthenticated: true,
		userId: 'testid',
		username: 'testuser',
		accessToken: 'testaccesstoken',
		handleLogout: mockLogout,
		setUserAuthInfo: jest.fn(),
	};

	beforeEach(() => {
		jest.resetAllMocks();
		(useRouter as jest.Mock).mockReturnValue(mockRouter);
	});

	it('renders correctly when authenticated', () => {
		render(
			<Auth.AuthContext.Provider value={{ ...mockAuthContext }}>
				<HeaderLoggedInSection />
			</Auth.AuthContext.Provider>
		);
		expect(screen.getByText('Welcome')).toBeInTheDocument();
		expect(screen.getByText('@testuser')).toBeInTheDocument();
		expect(screen.getByText('Share video')).toBeInTheDocument();
		expect(screen.getByText('Logout')).toBeInTheDocument();
	});

	it('calls router.push() correctly', () => {
		render(
			<Auth.AuthContext.Provider value={{ ...mockAuthContext }}>
				<HeaderLoggedInSection />
			</Auth.AuthContext.Provider>
		);

		const shareVideoButton = screen.getByText('Share video');
		const logoutButton = screen.getByText('Logout');

		logoutButton.click();
		expect(mockLogout).toHaveBeenCalled();

		shareVideoButton.click();
		expect(mockRouter.push).toHaveBeenCalledWith('/share');
	});
});

describe('PageHeader/HeaderAuthForm', () => {
	const mockRouter = {
		push: jest.fn(),
	};
	const mockLogout = jest.fn();

	const mockAuthContext = {
		isAuthenticating: false,
		isAuthenticated: false,
		userId: '',
		username: '',
		accessToken: '',
		handleLogout: mockLogout,
		setUserAuthInfo: jest.fn(),
	};

	beforeEach(() => {
		jest.resetAllMocks();
		(useRouter as jest.Mock).mockReturnValue(mockRouter);
	});

	it('renders login and register forms when user is not authenticated', async () => {
		render(
			<Auth.AuthContext.Provider value={{ ...mockAuthContext }}>
				<HeaderAuthForm />
			</Auth.AuthContext.Provider>
		);
		expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
		expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Register' })).toBeInTheDocument();
	});
});
