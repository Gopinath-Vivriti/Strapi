import {Image, Text, TouchableOpacity, View} from 'react-native';
import {TutorialVideosDatum} from '../../Home.type';
import {useNavigation} from '@react-navigation/native';

const VideoListCell = (item: TutorialVideosDatum) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('VideoPlayer', {
          videoURL: item.attributes.videoUrl,
        });
      }}
      style={{
        width: 300,
        backgroundColor: '#ced4da',
        borderRadius: 14,
        shadowColor: 'white',
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
      }}>
      <Image
        style={{height: 150, borderTopLeftRadius: 14, borderTopRightRadius: 15}}
        resizeMode={'cover'}
        source={{
          uri: item.attributes.thumbnailURL,
        }}
      />
      <View
        style={{
          padding: 16,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{fontWeight: '600', fontSize: 18, color: '#212529'}}
          numberOfLines={1}>
          {item.attributes.title}
        </Text>
        <Image
          style={{width: 32, height: 32}}
          source={require('../../../../img/play/play.png')}
        />
      </View>
    </TouchableOpacity>
  );
};

export default VideoListCell;
