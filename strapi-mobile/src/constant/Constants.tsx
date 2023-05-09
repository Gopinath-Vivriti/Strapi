import {Platform} from 'react-native';

export const API_TOKEN =
  'Bearer 56454e4afba0f3501523bc98419d18f170c51b2b6f4f7ed7afbf233f89faed792c27b609743bca8241516a025e16e432b150dc7daa26d891e0f787855da58921d47c0c51c195fe68421c03d2c6b0ba89c69b2bbe4e034a5ae5c87ed132c80ed73ddb90c0e92eebea5b483665ecba16272676adb8b7a04a8627dccbcc2c3696f4';

export const getBaseURL = () => {
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2';
  }
  return 'http://localhost';
};
