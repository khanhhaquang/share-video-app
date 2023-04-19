import { useState } from 'react';

import PageLayout from '@/components/PageLayout';
import InnerWrapper from '@/components/PageLayout/InnerWrapper';
import Input from '@/components/Input';

import ProtectedRoute from '../ProtectedRoute';
import Button from '@/components/Button/Button';
import { IResponseError } from '@/utils/axios';
import { useVideosContext } from '@/contexts/Videos';
import VideosService from '@/services/videos';
import { validateYoutubeURL } from '@/utils/helpers';

const ShareForm = () => {
	const { setVideos, videos } = useVideosContext();
	const [url, setUrl] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const isSubmitDisabled = isSubmitting || !validateYoutubeURL(url);

	const handleSubmit = async () => {
		try {
			setIsSubmitting(true);
			const data = await VideosService.share.call({ url });

			if (data.data) setVideos([data.data, ...videos]);
		} catch (error) {
			alert((error as IResponseError)?.message);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className='w-[400px] p-4 border border-black rounded-lg flex flex-col gap-y-4'>
			<h2 className='font-bold text-lg'>Share a youtube movie</h2>
			<form className='w-full flex items-center'>
				<label htmlFor='url' className='mr-2'>
					Youtube URL
				</label>
				<Input className='flex-1' value={url} type='url' id='url' onChange={(e) => setUrl((e.target as HTMLInputElement).value)} />
			</form>

			<Button disabled={isSubmitDisabled} className='w-20 p-2 mx-auto' onClick={() => handleSubmit()}>
				{isSubmitting ? 'Submitting...' : 'Submit'}
			</Button>
		</div>
	);
};

const Share = () => {
	return (
		<ProtectedRoute>
			<PageLayout>
				<InnerWrapper>
					<ShareForm />
				</InnerWrapper>
			</PageLayout>
		</ProtectedRoute>
	);
};

export default Share;
