import PageHeader from './Header';

type TProps = {
	children?: React.ReactNode;
};

const PageLayout: React.FC<TProps> = ({ children }) => {
	return (
		<>
			<PageHeader />
			<main className='w-screen min-h-screen pt-pageHeader overflow-x-hidden flex flex-col items-center'>{children}</main>
		</>
	);
};
export default PageLayout;
