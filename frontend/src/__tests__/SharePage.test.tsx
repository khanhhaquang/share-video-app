import { render, screen, fireEvent, act } from '@testing-library/react';
import { ShareForm } from '@/pages/share';
import { VideosContext } from '@/contexts/Videos';
import { IVideo } from '@/types/video';
import VideosService from '@/services/videos';

jest.mock('../services/videos', () => ({
	share: {
		call: jest.fn(),
	},
}));

describe('SharePage/Form', () => {
	const setVideos = jest.fn();

	const mockVideosContext = {
		setVideos: setVideos,
		getVideosList: jest.fn(),
		videos: [] as IVideo[],
	};

	beforeEach(() => {
		jest.resetAllMocks();
	});

	test('submits a valid YouTube URL', async () => {
		// render the ShareForm component with the useVideosContext mocked
		render(
			<VideosContext.Provider value={{ ...mockVideosContext }}>
				<ShareForm />
			</VideosContext.Provider>
		);

		// get the URL input and submit button
		const urlInput = screen.getByLabelText('Youtube URL');
		const submitButton = screen.getByText('Submit');

		// enter a valid YouTube URL
		fireEvent.change(urlInput, { target: { value: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' } });

		// submit the form
		fireEvent.click(submitButton);

		expect(VideosService.share.call).toBeCalled();
	});

	test('displays an error message for an invalid YouTube URL', async () => {
		// render the ShareForm component with the useVideosContext mocked
		render(
			<VideosContext.Provider value={{ ...mockVideosContext }}>
				<ShareForm />
			</VideosContext.Provider>
		);

		// get the URL input and submit button
		const urlInput = screen.getByLabelText('Youtube URL');
		const submitButton = screen.getByText('Submit');

		// enter an invalid YouTube URL
		fireEvent.change(urlInput, { target: { value: 'invalid-url' } });

		// submit the form
		fireEvent.click(submitButton);

		// verify that the VideosService.share.call function was not called
		expect(VideosService.share.call).not.toHaveBeenCalled();
	});
});
