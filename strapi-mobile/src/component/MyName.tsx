import React from 'react';
import {Text, View} from 'react-native';

import {MyNameProps} from '../MyApp.type';
const MyName = (props: MyNameProps): JSX.Element => {
  const {title, children} = props;
  return (
    <View>
      <Text>My Name is {title}</Text>
      {children}
    </View>
  );
};

export default MyName;
