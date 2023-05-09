import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import WebView from 'react-native-webview';
import {useHookstate} from '@hookstate/core';

const WebViewComponent = ({route, navigation}) => {
  const showActivityIndicator = useHookstate(true);
  const {pageURL} = route.params;

  const hideSpinner = () => {
    showActivityIndicator.set(false);
  };

  return (
    <View style={{flex: 1}}>
      <WebView
        onLoad={() => hideSpinner}
        style={{flex: 1}}
        source={{uri: pageURL}}
        startInLoadingState
        renderLoading={() => {
          return (
            <ActivityIndicator style={{alignSelf: 'center'}} size="large" />
          );
        }}
      />
    </View>
  );
};

export default WebViewComponent;
