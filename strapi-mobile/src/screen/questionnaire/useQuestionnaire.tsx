import {useHookstate} from '@hookstate/core';
import {Option, Questionnaire, QuestionnaireDatum} from './Questionnaire.type';
import {API_TOKEN, getBaseURL} from '../../constant/Constants';
import {useEffect} from 'react';
import SingleSelection from './components/SingleSelection';
import NPSSelection from './components/NPSSelection';
import MultiSelection from './components/MultiSelection';

type ScreenState = 'loading' | 'error' | 'ready';

interface QuestionnaireState {
  screenState: ScreenState;
  data: QuestionnaireDatum[];
}

interface Answers {
  question: string;
  answer: string;
  description: string;
}

const useQuestionnaire = () => {
  const initialState: QuestionnaireState = {
    screenState: 'loading',
    data: [],
  };
  const state = useHookstate<QuestionnaireState>(initialState);
  const currentIndex = useHookstate<number>(0);
  const answers = useHookstate<Answers[]>([]);
  const currentQuestionsAnswer = useHookstate<Answers | undefined>(undefined);

  const getScrollIndex = () => {
    const data = state.data.get();

    if (currentIndex.get() < data.length - 1) {
      if (currentQuestionsAnswer.get() !== undefined) {
        currentIndex.set(p => p + 1);
      }
    } else {
      console.log(answers.get());
      submitAmswer();
    }

    // if (currentIndex.get() < data.length - 1) {
    //   submitAmswer();
    // }
    return currentIndex.get();
  };

  const appendAnswer = () => {
    const answer = currentQuestionsAnswer.get();
    if (answer !== undefined) {
      answers.set(p => [...p, answer]);
      currentQuestionsAnswer.set(undefined);
    }
  };

  const getValueFromOptions = (options: Option[], selectedOptionID: number) => {
    const option = options.find(item => item.id === selectedOptionID);
    if (option !== undefined) {
      return option.value;
    }
    return '';
  };

  const getComponentForType = (data: QuestionnaireDatum): JSX.Element => {
    switch (data.attributes.question.questionType) {
      case 'single':
        return (
          <SingleSelection
            data={data.attributes.options}
            updateAnswer={({selectedOption, description}) => {
              currentQuestionsAnswer.set({
                question: data.attributes.question.question,
                answer: getValueFromOptions(
                  data.attributes.options,
                  selectedOption,
                ),
                description: description,
              });
            }}
          />
        );
      case 'nps':
        return (
          <NPSSelection
            data={data.attributes.options}
            updateAnswer={({selectedOption, description}) => {
              currentQuestionsAnswer.set({
                question: data.attributes.question.question,
                answer: getValueFromOptions(
                  data.attributes.options,
                  selectedOption,
                ),
                description: description,
              });
            }}
          />
        );
      case 'multiple':
        return (
          <MultiSelection
            data={data.attributes.options}
            updateAnswer={({selectedOption, description}) => {}}
          />
        );
      default:
        return (
          <SingleSelection
            data={data.attributes.options}
            updateAnswer={value => {
              const {selectedOption, description} = value;
              currentQuestionsAnswer.set({
                question: data.attributes.question.question,
                answer: getValueFromOptions(
                  data.attributes.options,
                  selectedOption,
                ),
                description: description,
              });
            }}
          />
        );
    }
  };

  const mapArrat = (): {
    question: string;
    selectedOption: string;
    description: string;
  }[] => {
    const da = answers.get();
    console.log(da);

    // if (da !== undefined) {
    //   const newArray = da.map(item => {
    //     console.log(item);
    //     return {
    //       question: item.question ?? '',
    //       selectedOption: item.answer ?? '',
    //       description: item.description ?? '',
    //     };
    //   });
    //   console.log(newArray);
    //   return newArray;
    // }
    return [];
  };
  const submitAmswer = async () => {
    state.screenState.set('loading');
    const array = mapArrat();
    console.log(answers.get());
    try {
      const response = await fetch(
        `${getBaseURL()}:1337/api/survey-responses`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: API_TOKEN,
          },
          body: JSON.stringify({
            data: {
              userID: `3113`,
              response: mapArrat(),
            },
          }),
        },
      );
      state.screenState.set('loading');
    } catch (error) {
      console.error('hello', error);
      state.set(p => ({screenState: 'error', data: p.data}));
    }
  };

  const getStrapiHomeData = async () => {
    state.screenState.set('loading');
    try {
      const response = await fetch(
        `${getBaseURL()}:1337/api/surveys?populate=*`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: API_TOKEN,
          },
        },
      );
      const json: Questionnaire = await response.json();
      state.set({screenState: 'ready', data: json.data});
    } catch (error) {
      console.error('hello', error);
      state.set(p => ({screenState: 'error', data: p.data}));
    }
  };

  useEffect(() => {
    getStrapiHomeData();
  }, []);

  return {
    get getData(): QuestionnaireDatum[] {
      return state.data.get() as QuestionnaireDatum[];
    },
    get screenState(): ScreenState {
      return state.screenState.get();
    },
    getComponentForType,
    getScrollIndex,
    appendAnswer,
  };
};

export default useQuestionnaire;
