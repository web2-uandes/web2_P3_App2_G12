import { useEffect, useState } from "react";
import API_CONTEXT from "./APIContext"
import Menu0 from "./Menu0";
import Menu1 from "./Menu1";
import Menu2 from "./Menu2";

function App() {
  const [menuState, setMenuState] = useState(0);
  const [questionAmount, setQuestionAmount] = useState(0);

  // Get params
  const queryParameters = new URLSearchParams(window.location.search)
  const user = queryParameters.get("user")
  const evaluation = queryParameters.get("evaluation")

  const contextValue = {
    evaluationId: evaluation,
    memberId: user
  }

  useEffect(()=>{
    if(evaluation != null && user!= null){
        setMenuState(1)
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  


  return (
    <API_CONTEXT.Provider value={contextValue}>
      {/* MenuState 0 is the intro menu */}
      {menuState === 0 && (
      <>
        <Menu0 />
      </>)}

      {/* MenuState 1 is the intro menu */}
      {menuState === 1 && (
      <>
        <Menu1 setMenuState={setMenuState} setQuestionAmount={setQuestionAmount}/>
      </>)}

      {/* MenuState 2 is the menu for answering questions */}
      {menuState === 2 && (
      <>
        <Menu2 questionAmount={questionAmount}/>
      </>)}
      
    </API_CONTEXT.Provider>
  );
}

export default App;
