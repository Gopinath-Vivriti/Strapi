import {FlatList, Text, View} from 'react-native';
import React from 'react';
import VideoListCell from './VideoListCell';
import {TutorialVideosDatum} from '../../Home.type';

interface VideoListProps {
  data: TutorialVideosDatum[];
}

const VideoList = (props: VideoListProps) => {
  const {data} = props;
  const renderItem = ({item}: {item: TutorialVideosDatum; index: number}) => {
    return <VideoListCell id={item.id} attributes={item.attributes} />;
  };

  return (
    <View>
      <Text
        style={{
          fontWeight: '700',
          fontSize: 18,
          color: '#f8f9fa',
          marginLeft: 16,
        }}>
        Tutorial Videos
      </Text>
      <FlatList
        style={{marginTop: 16}}
        data={data}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 16, paddingVertical: 8}}
        ItemSeparatorComponent={() => <View style={{width: 12}} />}
      />
    </View>
  );
};

export default VideoList;
