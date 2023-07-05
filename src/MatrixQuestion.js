import React, { useContext } from "react";
import API_CONTEXT from "./APIContext";

export default function MatrixQuestion({ options, hookState, setHookState }) {
  const { invitation } = useContext(API_CONTEXT);

  const axis = options.join(",").split(";");
  return <></>;
}
