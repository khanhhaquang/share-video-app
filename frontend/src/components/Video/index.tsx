import { IVideo } from '@/types/video';
import { generateToEmbed } from '@/utils/helpers';
import { twMerge } from 'tailwind-merge';

type TProps = {
	className?: string;
	data: IVideo;
};

const Video: React.FC<TProps> = ({ data, className }) => {
	return (
		<div className={twMerge('w-full flex items-start gap-x-4', className)}>
			<div className='w-1/2'>
				<iframe title='video-iframe' className='aspect-video w-full' src={generateToEmbed(data.url)}></iframe>
			</div>
			<div className='flex flex-col items-start justify-start gap-y-2'>
				<h3 className='text-xl font-bold'>{data.title}</h3>
				<span>Share by: @{data.shareBy}</span>
				<p>Author: {data.author || 'Author not found'}</p>
				<p>Description: {data.description || 'No description'}</p>
			</div>
		</div>
	);
};

export default Video;
