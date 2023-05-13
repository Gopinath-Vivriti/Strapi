import React from 'react';
import {ScrollView, Text, TextInput, TouchableOpacity} from 'react-native';
import {AnswerCallback, Option} from '../Questionnaire.type';
import {useHookstate} from '@hookstate/core';

const SingleSelection = ({
  data,
  updateAnswer,
}: {
  data: Option[];
  updateAnswer: (answer: AnswerCallback) => void;
}) => {
  const selectedAnswer = useHookstate<number | undefined>(undefined);
  const description = useHookstate<string>('');

  const showTextInput = () => {
    const selectedID = selectedAnswer.get();
    if (selectedID !== undefined) {
      const item = data.find(i => i.id === selectedID);
      if (item !== undefined) {
        return item.showTextField;
      }
    }
    return false;
  };

  return (
    <>
      <ScrollView>
        {data.map(item => (
          <TouchableOpacity
            onPress={() => {
              selectedAnswer.set(item.id);
              description.set('');
              updateAnswer({
                selectedOption: selectedAnswer.get()!,
                description: description.get(),
              });
            }}
            key={`${item.id}`}
            style={{
              backgroundColor:
                selectedAnswer.get() === item.id ? 'blue' : 'yellow',
              marginHorizontal: 16,
              marginVertical: 8,
              borderRadius: 16,
              alignItems: 'center',
            }}>
            <Text
              style={{
                margin: 16,
                color: selectedAnswer.get() === item.id ? 'white' : 'black',
              }}
              key={`${item}`}>
              {item.displayValue}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {showTextInput() && (
        <TextInput
          editable
          multiline
          placeholder={'May I know the reason'}
          numberOfLines={4}
          maxLength={160}
          value={description.get()}
          onChangeText={text => {
            description.set(text);
            updateAnswer({
              selectedOption: selectedAnswer.get()!,
              description: description.get(),
            });
          }}
          style={{
            padding: 10,
            height: 100,
            margin: 16,
            borderWidth: 1,
            borderRadius: 12,
            borderColor: 'yellow',
          }}
        />
      )}
    </>
  );
};

export default SingleSelection;
