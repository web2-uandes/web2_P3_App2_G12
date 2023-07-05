import React, { useContext } from "react";
import API_CONTEXT from "./APIContext";
import { sendQuestion } from "./Fetchs";

export default function MathQuestion({
  selectedValue,
  hookState,
  setHookState,
  setSelectedValue,
}) {
  const { invitation } = useContext(API_CONTEXT);

  const handleNextQuestion = async () => {
    // Handle the selected value here, e.g., pass it to an API call or perform some other action
    console.log("Selected Value:", selectedValue);
    await sendQuestion(invitation, selectedValue);
    setHookState(!hookState);
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value); // Update the selected value based on input
  };

  return (
    <>
      <div className="form-floating mb-3">
        <input
          type="number"
          id="typeNumber"
          className="form-control"
          onChange={handleChange}
        />
        <label className="form-label" htmlFor="typeNumber">
          Number input
        </label>
      </div>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={handleNextQuestion}
      >
        Send
      </button>
    </>
  );
}
