import {Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {getBaseURL} from '../../../../constant/Constants';
import {useNavigation} from '@react-navigation/native';

export interface BlogListCellProps {
  title: string;
  description: string;
  imageURL: string;
  pageURL: string;
}

const BlogListCell = ({item}: {item: BlogListCellProps}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('WebView', {
          pageURL: item.pageURL,
        });
      }}
      style={{
        width: 300,
        backgroundColor: '#ced4da',
        flexDirection: 'row',
        borderRadius: 14,
        padding: 16,
        alignItems: 'center',
        shadowColor: 'white',
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
      }}>
      <View style={{flex: 1, marginRight: 8}}>
        <Text
          style={{fontWeight: '600', fontSize: 18, color: '#212529'}}
          numberOfLines={1}>
          {item.title}
        </Text>
        <Text
          style={{
            fontWeight: '400',
            fontSize: 12,
            color: '#343a40',
            marginTop: 8,
          }}
          numberOfLines={3}>
          {item.description}
        </Text>
      </View>
      <Image
        style={{
          width: 75,
          height: 75,
          backgroundColor: 'white',
          borderRadius: 9999,
        }}
        source={{uri: `${getBaseURL()}:1337${item.imageURL}`}}
      />
    </TouchableOpacity>
  );
};

export default BlogListCell;
