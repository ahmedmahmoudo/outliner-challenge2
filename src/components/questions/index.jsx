import { useCallback, useMemo, useState } from "react";
import { QuestionComponent } from "../question";

export const QuestionsComponent = (props) => {
  const { onScoreChanged, onQuestionChanged, questions } = props;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  const currentQuestionIndex = useMemo(
    () => currentQuestion + 1,
    [currentQuestion]
  );
  const totalQuestions = useMemo(() => questions.length, [questions]);
  const { category, difficulty } = useMemo(() => {
    const current = questions[currentQuestion];
    return { category: current.category, difficulty: current.difficulty };
  }, [questions, currentQuestion]);

  const chosenAnswer = useMemo(() => {
    const answer = answeredQuestions.find(
      (q) => q.questionIndex === currentQuestion
    );
    if (answer) {
      return answer.answer;
    }
    return undefined;
  }, [currentQuestion, answeredQuestions]);

  const onAnswerChosen = (answer) => {
    const current = questions[currentQuestion];
    if (current.correctAnswer === answer) {
      onScoreChanged(true);
    } else {
      onScoreChanged(false);
    }
    setAnsweredQuestions((prev) => [
      ...prev,
      { questionIndex: currentQuestion, answer },
    ]);
  };

  const onNextQuestionClicked = useCallback(() => {
    if (currentQuestion - 1 < answeredQuestions.length) {
      const newIndex = currentQuestion++;
      setCurrentQuestion(newIndex);
      onQuestionChanged((newIndex / answeredQuestions.length) * 100);
    }
  }, [answeredQuestions, currentQuestion, onQuestionChanged]);

  return (
    <div
      className="d-flex justify-content-center align-items-start flex-column"
      style={{
        maxWidth: "800px",
      }}
    >
      <h1>
        Question {currentQuestionIndex} of {totalQuestions}
      </h1>
      <span className="category">{decodeURIComponent(category)}</span>
      {/* difficulty */}
      <QuestionComponent
        {...questions[currentQuestion]}
        onAnswerClicked={onAnswerChosen}
      />
    </div>
  );
};
