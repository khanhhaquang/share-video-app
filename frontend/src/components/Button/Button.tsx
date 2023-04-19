import { EventHandler, HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

type TProps = HTMLAttributes<HTMLButtonElement> & {
	children?: React.ReactNode;
	className?: string;
	disabled?: boolean;
};

const Button: React.FC<TProps> = ({ disabled, onClick, className, children, ...rest }) => {
	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (disabled) {
			return;
		}

		onClick?.(e);
	};

	return (
		<button
			disabled={disabled}
			onClick={(e) => handleClick(e)}
			className={twMerge(
				'cursor-pointer bg-white border border-black hover:text-white hover:bg-black text-center disabled:!bg-gray-400 disabled:cursor-not-allowed',
				className
			)}
			{...rest}
		>
			{children}
		</button>
	);
};

export default Button;
