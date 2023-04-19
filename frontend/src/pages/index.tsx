import PageLayout from '@/components/PageLayout';
import InnerWrapper from '@/components/PageLayout/InnerWrapper';
import Video from '@/components/Video';
import { useVideosContext } from '@/contexts/Videos';
import { useEffect } from 'react';

export const Videos = () => {
	const { videos, getVideosList } = useVideosContext();

	useEffect(() => {
		if (!videos.length) getVideosList();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [videos.length]);

	return (
		<div className='flex flex-col w-full gap-y-2'>
			{!videos.length && <h2 className='text-lg font-semibold'>No video has been shared</h2>}
			{videos.map((v) => (
				<Video data={v} key={v.id} />
			))}
		</div>
	);
};

export default function Home() {
	return (
		<PageLayout>
			<InnerWrapper>
				<Videos />
			</InnerWrapper>
		</PageLayout>
	);
}
