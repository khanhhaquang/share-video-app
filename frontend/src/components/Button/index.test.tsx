import { render, fireEvent } from '@testing-library/react';
import Button from './index';

describe('UI/Button', () => {
	it('should render a button element with text content', () => {
		const { getByText } = render(<Button>Click me</Button>);
		expect(getByText('Click me')).toBeInTheDocument();
	});

	it('should call the onClick handler when clicked', () => {
		const handleClick = jest.fn();
		const { getByRole } = render(<Button onClick={handleClick}>Click me</Button>);
		fireEvent.click(getByRole('button'));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it('should not call the onClick handler when disabled', () => {
		const handleClick = jest.fn();
		const { getByRole } = render(
			<Button disabled onClick={handleClick}>
				Click me
			</Button>
		);
		fireEvent.click(getByRole('button'));
		expect(handleClick).not.toHaveBeenCalled();
	});

	it('should have a disabled attribute when disabled', () => {
		const { getByRole } = render(<Button disabled>Click me</Button>);
		expect(getByRole('button')).toHaveAttribute('disabled');
	});

	it('should apply additional classNames', () => {
		const { getByRole } = render(<Button className='custom-class'>Click me</Button>);
		expect(getByRole('button')).toHaveClass('custom-class');
	});
});
