export interface Questionnaire {
  data: QuestionnaireDatum[];
}

export interface QuestionnaireDatum {
  id: number;
  attributes: QuestionnaireAttributes;
}

export interface QuestionnaireAttributes {
  question: Question;
  options: Option[];
}

export interface Option {
  id: number;
  displayValue: string;
  value: string;
  showTextField: boolean | null;
}

export type QuestionType = 'single' | 'nps' | 'multiple';
export interface Question {
  id: number;
  question: string;
  questionType: QuestionType;
}

export type AnswerCallback = {
  selectedOption: number;
  description: string;
};
