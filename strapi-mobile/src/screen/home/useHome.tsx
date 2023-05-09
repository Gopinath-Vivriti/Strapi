import {Home} from './Home.type';
import {API_TOKEN, getBaseURL} from '../../constant/Constants';
import {useHookstate} from '@hookstate/core';

type ScreenState = 'loading' | 'error' | 'ready';

interface HomeState {
  screenState: ScreenState;
  data: Home | undefined;
}

const useHome = () => {
  const initialState: HomeState = {screenState: 'loading', data: undefined};
  const state = useHookstate<HomeState>(initialState);

  const getStrapiHomeData = async () => {
    state.screenState.set('loading');
    try {
      const response = await fetch(
        `${getBaseURL()}:1337/api/home?populate[0]=bannerImage&populate[1]=blogs.image&populate[2]=introVideo&populate[3]=tutorial_videos`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: API_TOKEN,
          },
        },
      );
      const json: Home = await response.json();
      state.set({screenState: 'ready', data: json});
    } catch (error) {
      console.error('hello', error);
      state.set(p => ({screenState: 'error', data: p.data}));
    }
  };

  return {
    getStrapiHomeData,
    get getData(): Home | undefined {
      return state.data.get() as Home | undefined;
    },
    get screenState(): ScreenState {
      return state.screenState.get();
    },
  };
};

export default useHome;
