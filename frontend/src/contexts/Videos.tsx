import VideosService from '@/services/videos';
import { IVideo } from '@/types/video';
import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from 'react';

export interface IVideosContext {
	videos: IVideo[];
	setVideos: Dispatch<SetStateAction<IVideo[]>>;
	getVideosList: () => Promise<void>;
}

const VideosContext = createContext<IVideosContext>({
	videos: [],
	setVideos: () => {},
	getVideosList: async () => {},
});

const VideosProvider = ({ children }: { children: ReactNode }) => {
	const [videos, setVideos] = useState<IVideo[]>([]);

	const getVideosList = async () => {
		try {
			const data = await VideosService.getList.call();
			setVideos(data?.data || []);
		} catch (error) {
			alert(error);
		}
	};

	return <VideosContext.Provider value={{ videos, setVideos, getVideosList }}>{children}</VideosContext.Provider>;
};

export default VideosProvider;
export { VideosContext, VideosProvider };

export const useVideosContext = () => {
	const data = useContext(VideosContext);

	if (!data) {
		throw Error('Please use this hook inside VideosProvider');
	}

	return data;
};
