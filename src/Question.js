import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Alternative from "./Alternative";
import NextQuestionButton from "./NextQuestionButton";
import MathQuestion from "./MathQuestion";
import SemiOpenQuestion from "./SemiOpenQuestion";
import MatrixQuestion from "./MatrixQuestion";

export default function Question({
  evaluationId,
  memberId,
  question,
  questionType,
  questionOptions,
  hookState,
  setHookState,
}) {
  // Alternatives state
  const [selectedValue, setSelectedValue] = useState("");
  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div>
      <div>{question}</div>

      {/* True or False */}
      {questionType === 0 && (
        <>
          <Alternative
            handleRadioChange={handleRadioChange}
            selectedValue={selectedValue}
            text="True"
          />
          <Alternative
            handleRadioChange={handleRadioChange}
            selectedValue={selectedValue}
            text="False"
          />
          <NextQuestionButton
            evaluationId={evaluationId}
            memberId={memberId}
            selectedValue={selectedValue}
            hookState={hookState}
            setHookState={setHookState}
          />
        </>
      )}

      {/* Multiple-choice question */}
      {questionType === 1 && (
        <>
          {questionOptions.map((option) => (
            <Alternative
              key={uuidv4()}
              handleRadioChange={handleRadioChange}
              selectedValue={selectedValue}
              text={option}
            />
          ))}
          <NextQuestionButton
            selectedValue={selectedValue}
            hookState={hookState}
            setHookState={setHookState}
          />
        </>
      )}

      {/* Fill question */}
      {questionType === 2 && (
        <>
          <SemiOpenQuestion
            options={questionOptions}
            hookState={hookState}
            setHookState={setHookState}
          />
        </>
      )}

      {/* Math question */}
      {questionType === 3 && (
        <>
          <MathQuestion
            selectedValue={selectedValue}
            hookState={hookState}
            setHookState={setHookState}
            setSelectedValue={setSelectedValue}
          />
        </>
      )}

      {/* Matrix question */}
      {questionType === 4 && (
        <>
          <NextQuestionButton
            selectedValue={selectedValue}
            hookState={hookState}
            setHookState={setHookState}
          />
        </>
      )}
    </div>
  );
}
