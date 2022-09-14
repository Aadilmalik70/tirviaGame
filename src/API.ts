import { shuffleArray } from "./utils";

export type Question = {
  category: string;
  type: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

export type QuestionState = Question & { answers: string[] };


export const fetchQuestions = async (
  amount: number
): Promise<QuestionState[]> => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&category=9&difficulty=easy&type=multiple`;
  const data = await (await fetch(endpoint)).json();
  return data.results.map((question: Question) => ({
    ...question,
    answers: shuffleArray([
      ...question.incorrect_answers,
      question.correct_answer
    ])
  }));
};
