import { createSlice } from '@reduxjs/toolkit'

// Change these to your own questions!
const questions = [
  {
    id: 1,
    questionText: 'Who was the first woman to win a Nobel prize?',
    options: ['Selma Lagerlöf', 'Marie Curie', 'Mother Teresa'],
    correctAnswerIndex: 1,
    answerURL: './images/marie-curie1.jpg'
  },
  {
    id: 2,
    questionText:
      'Who was the first woman to, in 1932, fly nonstop and alone over the Atlantic?',
    options: ['Kathrine Switzer', 'Amelia Earhart', 'Gertrude Ederle'],
    correctAnswerIndex: 1,
    answerURL: './images/Amelia_Earthart.jpg'
  },
  {
    id: 3,
    questionText: 'Who was the first woman in space?',
    options: ['Valentina Tereshkova', 'Sally Ride', 'Mae Jemison'],
    correctAnswerIndex: 0,
    answerURL: './images/Valentina tereskhova.jpg'
  },
  {
    id: 4,
    questionText:
      'Which woman, who lived 1815-1852, is described as the first programmer in history?',
    options: ['Grace Hopper', 'Mae Jemison', 'Ada Lovelace'],
    correctAnswerIndex: 2,
    answerURL: './images/Ada_lovelace.jpg'
  },
  {
    id: 5,
    questionText:
      'What is the name of the President of the European Commission since 1 Dec 2019 and also the first woman to hold this post?',
    options: ['Angela Merkel', 'Ursula von der Leyen', 'Christine Lagarde'],
    correctAnswerIndex: 1,
    answerURL: './images/Ursula von der leyen.jpg'
  }
]

const initialState = {
  questions,
  answers: [],
  currentQuestionIndex: 0,
  quizOver: false
}

export const quiz = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    /**
     * Use this action when a user selects an answer to the question.
     * The answer will be stored in the `quiz.answers` state with the
     * following values:
     *
     *    questionId  - The id of the question being answered.
     *    answerIndex - The index of the selected answer from the question's options.
     *    question    - A copy of the entire question object, to make it easier to show
     *                  details about the question in your UI.
     *    answer      - The answer string.
     *    isCorrect   - true/false if the answer was the one which the question says is correct.
     *
     * When dispatching this action, you should pass an object as the payload with `questionId`
     * and `answerIndex` keys. See the readme for more details.
     */
    submitAnswer: (state, action) => {
      const { questionId, answerIndex } = action.payload
      const question = state.questions.find((q) => q.id === questionId)

      if (!question) {
        throw new Error(
          'Could not find question! Check to make sure you are passing the question id correctly.'
        )
      }

      if (question.options[answerIndex] === undefined) {
        throw new Error(
          `You passed answerIndex ${answerIndex}, but it is not in the possible answers array!`
        )
      }

      state.answers.push({
        questionId,
        answerIndex,
        question,
        answer: question.options[answerIndex],
        isCorrect: question.correctAnswerIndex === answerIndex
      })
    },

    /**
     * Use this action to progress the quiz to the next question. If there's
     * no more questions (the user was on the final question), set `quizOver`
     * to `true`.
     *
     * This action does not require a payload.
     */
    goToNextQuestion: (state) => {
      if (state.currentQuestionIndex + 1 === state.questions.length) {
        state.quizOver = true
      } else {
        state.currentQuestionIndex += 1
      }
    },

    /**
     * Use this action to reset the state to the initial state the page had
     * when it was loaded. Who doesn't like re-doing a quiz when you know the
     * answers?!
     *
     * This action does not require a payload.
     */
    restart: () => {
      return initialState
    }
  }
})
