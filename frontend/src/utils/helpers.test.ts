import { validateYoutubeURL } from './helpers';

describe('helpers/validateYoutubeURL', () => {
	it('should return true for a valid YouTube URL', () => {
		const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
		expect(validateYoutubeURL(url)).toBe(true);
	});

	it('should return false for an invalid YouTube URL', () => {
		const url = 'https://www.google.com';
		expect(validateYoutubeURL(url)).toBe(false);
	});
});
