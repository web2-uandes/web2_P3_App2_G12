import React from 'react';
import Question from './Question'
import { useFetchQuestion } from './useFetchQuestion';
import ProgressBar from "./ProgressBar";
import PieChartComponent from './PieChartComponent';

export default function Menu2({questionAmount}) {
  const { questionData, hookState, setHookState } = useFetchQuestion();
  

  return (
    <>
    <ProgressBar question={questionData['questionOrder']} questionAmount={questionAmount}/>
    <Question question={questionData['question']} questionType={questionData['type']} questionOptions={questionData['options']} 
    hookState={hookState} setHookState={setHookState}/>
    {(questionData['questionOrder'] === -1) && (
        <PieChartComponent />
    )}
    </>
    
  )
}
