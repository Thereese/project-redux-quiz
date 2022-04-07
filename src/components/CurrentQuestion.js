import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'

import { quiz } from 'reducers/quiz'
import { Summary } from 'components/Summary'
import { ProgressBar } from 'components/ProgressBar'

export const QuestionBackground = styled.div`
  margin: 0;
  background-color: #326886;
  height: 100vh;
  width: 100%
  padding: 30px;
  padding-top: 50px;
  z-index: 0;

  .circle {
    position: absolute;
    border-radius: 50%;
    background: white;
    animation: ripple 15s infinite;
    z-index: 1;
  }

  @keyframes ripple {
    0% {
      transform: scale(0.9);
    }

    50% {
      transform: scale(1.2);
    }

    100% {
      transform: scale(0.8);
    }
  }

  .large {
    width: 200px;
    height: 200px;
    left: -20px;
    top: 83%;
    background-color: #b58526;
  }

  .medium {
    width: 100px;
    height: 100px;
    left: -20px;
    top: 67%;
    background-color: #b58526;
  }

  .small {
    width: 60px;
    height: 60px;
    left: 75px;
    top: 57%;
    background-color: #b58526;
  }
`
const QuestionContainer = styled.div`
  background-color: #7da7be;
  margin-top: 10%;
  margin: auto;
  padding: 30px;
  width: 50vw;
  border-radius: 10px;
  border: #b58526 solid 2px;
  text-align: center;
  z-index: 2;

  h1 {
    color: #d2e9f5;
    font-size: 25px;
  }

  h2 {
    color: #435a67;
    font-size: 20px;
  }

  .text {
    z-index: 2;
  }

  // .btn-container {
  //   display: flex;
  //   justify-content: center;
  //   flex-direction: column;
  // }

  .option-btn {
    border: none;
    background-color: #d2e9f5;
    width: 100px;
    height: 50px;
    padding: 10px;
    margin: 10px;
    border-radius: 60px;
    color: #326886;
    cursor: pointer;
    // display: inline-block;
  }

  .incorrect-answer {
    background-color: #326886;
    color: gray;
    border: solid gray;
  }

  .correct-answer {
    background-color: #f5ca73;
    color: #326886;
  }

  .next-btn {
    border: none;
    padding: 10px;
    margin: 10px;
    border-radius: 50px;
    color: #326886;
    cursor: pointer;
    font-size: 12px;
    margin-top: 25px;
    border: solid gray;
  }

  button[disabled] {
    cursor: not-allowed;
  }
`

export const CurrentQuestion = () => {
  // @ida getting data from the store / "postnord"
  const question = useSelector(
    (state) => state.quiz.questions[state.quiz.currentQuestionIndex]
  )

  // const answer = useSelector(
  //   (state) => state.quiz.answers.find((a) => (a.questionId === question.id))
  // )

  // @ida simply to add a console.log
  // const store = useSelector((state) => state)
  // console.log(store, 'store')

  // @joanna - added to be able to push user through to Summary after last question.
  const quizOver = useSelector((state) => state.quiz.quizOver)

  const userAnswer = useSelector((state) =>
    state.quiz.answers.find((answer) => question.id === answer.questionId)
  )

  // @ida forwarding data from the store / updating the store / "DHL"
  const dispatch = useDispatch()

  const onNextButton = () => {
    dispatch(quiz.actions.goToNextQuestion())
  }
  const onAnswerSubmit = (id, index) => {
    dispatch(quiz.actions.submitAnswer({ questionId: id, answerIndex: index }))
    // if (question.correctAnswerIndex === index) {
    //   // dispatch(quiz.actions.goToNextQuestion());
    // } else {
    //   alert('Wrong answer, pls try again!')
    // }
  }

  // This pushes the user to the Summary after last question.
  if (quizOver === true) {
    return <Summary />
  }

  if (!question) {
    return <h1>Oh no! I could not find the current question!</h1>
  }

  return (
    <QuestionBackground>
      <QuestionContainer>
        <div className="text">
          <div className="circle large"></div>
          <div className="circle medium"></div>
          <div className="circle small"></div>
          <h2>Question:</h2>
          <h1>{question.questionText}</h1>
          {question.options.map((item, index) => {
            return (
              <div>
                <button
                  className={
                    userAnswer && index === question.correctAnswerIndex
                      ? 'correct-answer option-btn'
                      : userAnswer && index === userAnswer.answerIndex
                      ? 'incorrect-answer option-btn'
                      : 'option-btn'
                  }
                  type="button"
                  key={item}
                  onClick={() => onAnswerSubmit(question.id, index)}
                  disabled={userAnswer}
                  // disabled={answers.length === question.id}
                >
                  {item}
                </button>
              </div>
            )
          })}
          <div>
            <button
              type="button"
              onClick={() => onNextButton()}
              disabled={!userAnswer}
              className="next-btn"
            >
              Next question
            </button>
          </div>
          <ProgressBar />
        </div>
      </QuestionContainer>
    </QuestionBackground>
  )
}
