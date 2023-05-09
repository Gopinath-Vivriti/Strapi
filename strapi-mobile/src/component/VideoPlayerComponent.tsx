import {View} from 'react-native';
import Video from 'react-native-video';

const VideoPlayerComponent = ({route, navigation}) => {
  const {videoURL} = route.params;
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'black',
      }}>
      <Video
        style={{height: 500, width: '100%'}}
        onVideoLoadStart={() => {
          console.log('something');
        }}
        source={{
          uri: videoURL,
        }}
        controls
      />
    </View>
  );
};

export default VideoPlayerComponent;
