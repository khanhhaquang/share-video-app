import { render, fireEvent } from '@testing-library/react';
import Input from './index';

describe('UI/Input', () => {
	it('should render an input element', () => {
		const { container } = render(<Input />);
		expect(container.querySelector('input')).toBeInTheDocument();
	});

	it('should apply additional classNames', () => {
		const { getByRole } = render(<Input className='custom-class' />);
		expect(getByRole('textbox')).toHaveClass('custom-class');
	});

	it('should render with the given type', () => {
		const { getByTestId } = render(<Input type='password' data-testid='password' />);
		expect(getByTestId('password')).toHaveAttribute('type', 'password');
	});

	it('should render with the given value', () => {
		const { getByRole } = render(<Input value='test' />);
		expect(getByRole('textbox')).toHaveValue('test');
	});

	it('should pass other props to the input element', () => {
		const onChange = jest.fn();
		const { getByRole } = render(<Input onChange={onChange} />);
		fireEvent.change(getByRole('textbox'), { target: { value: 'test' } });
		expect(onChange).toHaveBeenCalledTimes(1);
	});
});
