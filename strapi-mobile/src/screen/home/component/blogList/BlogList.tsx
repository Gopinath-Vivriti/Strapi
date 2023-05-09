import React from 'react';
import {FlatList, Text, View} from 'react-native';

import BlogListCell from './BlogListCell';
import {BlogsData} from '../../Home.type';

interface BlogListProps {
  data: BlogsData[];
}

const BlogList = (props: BlogListProps) => {
  const {data} = props;
  const renderItem = ({item}: {item: BlogsData; index: number}) => {
    return (
      <BlogListCell
        item={{
          title: item.attributes.title,
          description: item.attributes.description,
          imageURL: item.attributes.image.data.attributes.url,
          pageURL: item.attributes.blogURL,
        }}
      />
    );
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
        Tutorial Blogs
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

export default BlogList;
