import { twMerge } from 'tailwind-merge';
import Button from './Button';

type TProps = {
	children?: React.ReactNode;
	className?: string;
	onClick: Function;
};

const LoadMoreButton: React.FC<TProps> = ({ className, children, onClick }) => {
	return (
		<Button className={twMerge('w-[296px] rounded-md h-14 bg-loadmore-btn text-light text-lg', className)} onClick={() => onClick()}>
			{children}
		</Button>
	);
};

export default LoadMoreButton;
