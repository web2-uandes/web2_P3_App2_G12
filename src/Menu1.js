import { useEffect, useState, useContext } from "react";
import { fetchAssignment, fetchEvaluation, fetchGroup } from "./Fetchs";
import API_CONTEXT from "./APIContext"
import Assignment from "./Assignment";
import Evaluation from "./Evaluation";
import Group from "./Group";

export default function Menu1({ setMenuState, setQuestionAmount }) {
  const [evaluation, setEvaluation] = useState("");
  const [assignment, setAssignment] = useState("");
  const [group, setGroup] = useState();

  const {evaluationId} = useContext(API_CONTEXT)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const evalu = await fetchEvaluation(evaluationId);
        const assign = await fetchAssignment(evalu.tmp_assignment_id);
        const gr = await fetchGroup(evalu.group_id);
        setEvaluation(evalu);
        setQuestionAmount(evalu.questions_amount);
        setAssignment(assign);
        setGroup(gr);
      } catch (error) {
        console.log('Error fetching evaluation:', error);
      }
    }
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const availableForAnswering = true;

  return (
    <div className="menu1 text-center"> 
      {evaluation && (<Evaluation evaluation={evaluation} />)}
      <div className="card border-dark mb-3">
        {group && (<Group group={group} />)}
        {assignment && (<Assignment assignment={assignment} />)}
      </div>
      
      
      {/* If dueDate not reached then render button to allow answer */}
      {availableForAnswering && (
      <button type="button" className="btn btn-primary btn-lg btn-block"
        onClick={() => {
          setMenuState(2);
        }}
      >
        Start
      </button>
      )}
    </div>
  );
}
