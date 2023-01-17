import classNames from "classnames";
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

  const shouldDisable = useCallback(
    (answer) => {
      if (chosenAnswer) {
        if (chosenAnswer !== answer && answer === correctAnswer) return false;
        return true;
      }
      return false;
    },
    [chosenAnswer, correctAnswer]
  );

  return (
    <div className="row">
      <h1 className="col col-12 mb-5" style={{ fontSize: "24px" }}>
        {decodeURIComponent(question)}
      </h1>
      <div className="row">
        {answers.map((answer, index) => (
          <div
            key={index}
            className={classNames("col-6 mb-5", {
              "d-flex justify-content-end": (index + 1) % 2 === 0,
            })}
          >
            <Button
              onClick={() => onAnswerClicked(answer)}
              style={{ width: "200px" }}
              className={classNames({
                "btn-info": chosenAnswer === answer,
                "btn-danger": !shouldDisable(answer) && chosenAnswer,
                active: chosenAnswer === answer,
                disabled: chosenAnswer !== answer && shouldDisable(answer),
              })}
            >
              {decodeURIComponent(answer)}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
