export function validateYoutubeURL(url: string) {
	const regex = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

	return !!url.match(regex);
}

export function generateToEmbed(url: string) {
	return url.replace('watch?v=', 'embed/');
}
