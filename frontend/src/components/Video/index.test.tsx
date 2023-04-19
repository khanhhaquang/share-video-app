import { render } from '@testing-library/react';
import Video from './index';
import { generateToEmbed } from '@/utils/helpers';

describe('UI/Video', () => {
	const videoData = {
		id: 'fsf',
		title: 'Test Video',
		shareBy: 'testuser',
		url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
		author: 'Test Author',
		description: 'This is a test video',
		createdAt: new Date(),
	};

	it('should render the video details correctly', () => {
		const { getByText, getByTitle } = render(<Video data={videoData} />);
		expect(getByText(videoData.title)).toBeInTheDocument();
		expect(getByText(`Share by: @${videoData.shareBy}`)).toBeInTheDocument();
		expect(getByText(`Author: ${videoData.author}`)).toBeInTheDocument();
		expect(getByText(`Description: ${videoData.description}`)).toBeInTheDocument();
		expect(getByTitle('video-iframe')).toHaveAttribute('src', generateToEmbed(videoData.url));
	});
});
