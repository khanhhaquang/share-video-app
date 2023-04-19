import { render } from '@testing-library/react';
import PageHeader from './Header';
import PageLayout from './index';

describe('PageLayout', () => {
	it('should render the PageHeader component', () => {
		const { getByRole } = render(<PageLayout />);
		expect(getByRole('banner')).toBeInTheDocument();
	});

	it('should render its children', () => {
		const { getByText } = render(
			<PageLayout>
				<p>Child element</p>
			</PageLayout>
		);
		expect(getByText('Child element')).toBeInTheDocument();
	});
});
