import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import homeStyle from './Home.style';
import Banner from './component/banner/Banner';
import BlogList from './component/blogList/BlogList';
import useHome from './useHome';
import Video from 'react-native-video';
import {getBaseURL} from '../../constant/Constants';
import VideoList from './component/videoList/VideoList';
import WebView from 'react-native-webview';

const Home = () => {
  const {getStrapiHomeData, getData, screenState} = useHome();

  useEffect(() => {
    getStrapiHomeData();
  }, []);
  const renderItem = ({item}: {item: number; index: number}) => {
    if (item === 1) {
      return (
        <Banner
          imageURL={`${getBaseURL()}:1337${
            getData?.data.attributes.bannerImage.data.attributes.url
          }`}
          title={getData?.data.attributes.bannerText.title || ''}
          description={getData?.data.attributes.bannerText.description || ''}
        />
      );
    } else if (item === 2) {
      return (
        <View style={{marginTop: 32}}>
          <BlogList
            data={
              getData?.data === undefined
                ? []
                : getData.data.attributes.blogs.data
            }
          />
        </View>
      );
    } else if (item === 3) {
      return (
        <View style={{backgroundColor: 'black', justifyContent: 'center'}}>
          <Video
            controls
            repeat
            source={{
              uri: `${getBaseURL()}:1337${
                getData?.data.attributes.introVideo.data.attributes.url
              }`,
            }}
            style={{
              height: 200,
              borderRadius: 12,
              marginHorizontal: 16,
              marginVertical: 32,
            }} // Can be a URL or a local file.
          />
        </View>
      );
    } else if (item === 4) {
      return (
        <WebView
          style={{marginTop: Platform.OS == 'ios' ? 20 : 0, height: 200}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          source={{
            uri: 'https://www.youtube.com/embed/' + '9HF2QPSpQ90',
          }}
        />
      );
    }

    return (
      <View style={{marginTop: 32}}>
        <VideoList data={getData!.data.attributes.tutorial_videos.data} />
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {screenState === 'ready' ? (
        <FlatList
          style={{backgroundColor: '#414141'}}
          data={[3, 1, 2, 0, 4]}
          renderItem={renderItem}
          contentContainerStyle={{paddingBottom: 32}}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Home;
