import type { AppProps } from 'next/app';

import AuthProvider from '@/contexts/Auth';
import VideosProvider from '@/contexts/Videos';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<AuthProvider>
			<VideosProvider>
				<Component {...pageProps} />
			</VideosProvider>
		</AuthProvider>
	);
}
