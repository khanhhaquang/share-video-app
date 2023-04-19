import { render } from '@testing-library/react';
import InnerWrapper from './InnerWrapper';

describe('PageLayout/InnerWrapper', () => {
	it('should render children', () => {
		const { getByText } = render(
			<InnerWrapper>
				<p>Child element</p>
			</InnerWrapper>
		);
		expect(getByText('Child element')).toBeInTheDocument();
	});

	it('should apply additional classNames', () => {
		const { getByTestId } = render(<InnerWrapper data-testid='inner-wrapper' className='custom-class' />);
		expect(getByTestId('inner-wrapper')).toHaveClass('custom-class');
	});
});
