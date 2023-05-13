import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import useQuestionnaire from './useQuestionnaire';
import {QuestionnaireDatum} from './Questionnaire.type';

const Questionnaire = () => {
  const {
    screenState,
    getData,
    getComponentForType,
    getScrollIndex,
    appendAnswer,
  } = useQuestionnaire();
  const renderItem = ({item}: {item: QuestionnaireDatum; index: number}) => {
    const {width} = Dimensions.get('window');

    return (
      <View
        style={{
          flex: 1,
          borderWidth: 1,
          width: width,
        }}>
        <Text
          style={{
            alignSelf: 'center',
            marginHorizontal: 32,
            marginVertical: 16,
            fontSize: 18,
            fontWeight: '600',
          }}>
          {item.attributes.question.question}
        </Text>
        {getComponentForType(item)}
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#414141'}}>
      {screenState === 'ready' ? (
        <>
          <FlatList
            ref={ref => (this.flatlist = ref)}
            style={{flex: 1}}
            data={getData}
            renderItem={renderItem}
            horizontal
            pagingEnabled
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
          />
          <TouchableOpacity
            style={{
              marginVertical: 16,
              marginHorizontal: 32,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'red',
              borderRadius: 12,
            }}
            onPress={() => {
              this.flatlist.scrollToIndex({index: getScrollIndex()});
              appendAnswer();
            }}>
            <Text style={{marginVertical: 16, color: 'white'}}>Press</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator />
        </View>
      )}
    </View>
  );
};

export default Questionnaire;
