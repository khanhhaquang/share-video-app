import { render, screen } from '@testing-library/react';

import * as Videos from '@/contexts/Videos';
import { Videos as VideosList } from '@/pages/index';
import { IVideo } from '@/types/video';

describe('HomePage/Videos', () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	it('renders with empty data', async () => {
		const mockVideosContext = {
			videos: [] as IVideo[],
			setVideos: jest.fn(),
			getVideosList: jest.fn(),
		};

		render(
			<Videos.VideosContext.Provider value={{ ...mockVideosContext }}>
				<VideosList />
			</Videos.VideosContext.Provider>
		);
		expect(screen.queryByTitle('video-iframe')).not.toBeInTheDocument();
	});

	it('renders with list of data', async () => {
		const mockVideosContext = {
			videos: [{ id: 'testid', createdAt: new Date(), shareBy: 'testshare', url: 'testurl' }] as IVideo[],
			setVideos: jest.fn(),
			getVideosList: jest.fn(),
		};

		render(
			<Videos.VideosContext.Provider value={{ ...mockVideosContext }}>
				<VideosList />
			</Videos.VideosContext.Provider>
		);
		expect((await screen.findAllByTitle('video-iframe')).length).toBe(1);
	});
});
