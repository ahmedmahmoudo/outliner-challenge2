import { useCallback, useMemo } from "react";
import { Button } from "../button";

export const QuestionComponent = (props) => {
  const {
    question,
    correct_answer: correctAnswer,
    incorrect_answers: incorrectAnswers,
    onAnswerClicked,
    chosenAnswer,
  } = props;

  const answers = useMemo(
    () =>
      [correctAnswer, ...incorrectAnswers].sort(() =>
        Math.random() > 0.5 ? 1 : -1
      ),
    [correctAnswer, incorrectAnswers]
  );

  return (
    <div className="row">
      <h1 className="col col-12 mb-5" style={{ width: "800px" }}>
        {decodeURIComponent(question)}
      </h1>
      <div className="row" style={{ width: "800px" }}>
        {answers.map((answer, index) => (
          <div className="col-6 mb-5">
            <Button
              key={index}
              onClick={() => onAnswerClicked(answer)}
              disabled={chosenAnswer}
              style={{ width: "200px" }}
            >
              {decodeURIComponent(answer)}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
