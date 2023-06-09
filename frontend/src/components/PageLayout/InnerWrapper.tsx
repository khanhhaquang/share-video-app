import React from 'react';
import { twMerge } from 'tailwind-merge';

const InnerWrapper: React.FC<{ children?: React.ReactNode; className?: string }> = ({ children, className, ...rest }) => {
	return (
		<div className={twMerge('w-pageInner flex flex-col items-center pt-14 pb-16 gap-y-14', className)} {...rest}>
			{children}
		</div>
	);
};

export default InnerWrapper;
