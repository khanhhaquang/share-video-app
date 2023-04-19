import { HTMLInputTypeAttribute, HtmlHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

type TProps = HtmlHTMLAttributes<HTMLInputElement> & {
	className?: string;
	type?: HTMLInputTypeAttribute;
	value?: string;
};

const Input: React.FC<TProps> = ({ className, ...rest }) => {
	return <input className={twMerge('p-2 border border-black', className)} {...rest}></input>;
};

export default Input;
