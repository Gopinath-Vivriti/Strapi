import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {AnswerCallback, Option} from '../Questionnaire.type';
import {useHookstate} from '@hookstate/core';

const MultiSelection = ({
  data,
  updateAnswer,
}: {
  data: Option[];
  updateAnswer: (answer: AnswerCallback) => void;
}) => {
  const selectedAnswers = useHookstate<number[]>([]);

  const isSelectedAnswer = (id: number): boolean => {
    const answerData = selectedAnswers.get();
    console.log(answerData);

    if (answerData.length === 0) {
      return false;
    }

    return answerData.includes(id);
  };

  const selectDeselect = (id: number) => {
    let answerData = selectedAnswers.get();
    if (answerData.length !== 0 && answerData.includes(id)) {
      const index = answerData.indexOf(id);
      if (index > -1) {
        const updatedArray = answerData
          .slice(0, index)
          .concat(answerData.slice(index + 1));
        selectedAnswers.set(updatedArray);
      }
    } else {
      selectedAnswers.set(p => [...p, id]);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}>
      {data.map(item => (
        <TouchableOpacity
          onPress={() => {
            selectDeselect(item.id);
            updateAnswer({
              selectedOption: selectedAnswers.get()[0],
              description: '',
            });
          }}
          key={`${item.id}`}
          style={{
            backgroundColor: isSelectedAnswer(item.id) ? 'blue' : 'yellow',
            margin: 8,
            borderRadius: 16,
          }}>
          <Text style={{margin: 16}} key={`${item}`}>
            {item.displayValue}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default MultiSelection;
