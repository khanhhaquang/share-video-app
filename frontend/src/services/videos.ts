import { IVideo } from '@/types/video';
import axiosInstance from '@/utils/axios';

const VideosService = {
	getList: {
		key: 'videos.getList',
		call: () => axiosInstance.get<IVideo[]>(`/videos`),
	},
	share: {
		key: 'videos.share',
		call: ({ url }: { url: string }) =>
			axiosInstance.post<IVideo>(`/videos/share`, {
				url,
			}),
	},
};

export default VideosService;
