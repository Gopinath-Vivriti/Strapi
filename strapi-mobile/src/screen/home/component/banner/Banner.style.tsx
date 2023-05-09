import {StyleSheet} from 'react-native';

const bannerStyle = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 32,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
    backgroundColor: 'black',
  },
  title: {color: '#f8f9fa', fontWeight: '600', fontSize: 18},
  description: {
    marginTop: 12,
    color: '#f8f9fa',
    fontWeight: '400',
    fontSize: 16,
  },
});

export default bannerStyle;
