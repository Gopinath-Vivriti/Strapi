import React from 'react';
import {ImageBackground, Text} from 'react-native';
import bannerStyle from './Banner.style';

interface BannerProps {
  imageURL: string;
  title: string;
  description: string;
}
const Banner = (props: BannerProps) => {
  const {imageURL, description, title} = props;
  return (
    <ImageBackground source={{uri: imageURL}} style={bannerStyle.container}>
      <Text style={bannerStyle.title}>{title}</Text>
      <Text style={bannerStyle.description} numberOfLines={3}>
        {description}
      </Text>
    </ImageBackground>
  );
};

export default Banner;
