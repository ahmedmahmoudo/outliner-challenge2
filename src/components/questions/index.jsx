import { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import colors from "../../constants/colors";
import { Button } from "../button";
import { DifficultyComponent } from "../difficulty";
import { ProgressBarComponent } from "../progressBar";
import { QuestionComponent } from "../question";

const ProgressBarsContainer = styled.div`
  border: 1px solid black;
  border-radius: 8px;
  width: 400px;
  height: 40px;
  position: relative;
  display: grid;
`;

const CustomProgressBar = styled(ProgressBarComponent)`
  grid-column: 1;
  grid-row: 1;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  border-top-right-radius: ${(props) => (props.progress === 100 ? "8px" : "0")};
  border-bottom-right-radius: ${(props) =>
    props.progress === 100 ? "8px" : "0"};
  z-index: ${(props) => props.zIndex};
`;

const NextQuestionButton = styled(Button)`
  width: 200px;
  margin-top: 20px;
`;

export const QuestionsComponent = (props) => {
  const { onQuestionChanged, questions } = props;

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

  const { chosenAnswer, isAnswerCorrect } = useMemo(() => {
    const answer = answeredQuestions.find(
      (q) => q.questionIndex === currentQuestion
    );
    if (answer) {
      return { chosenAnswer: answer.answer, isAnswerCorrect: answer.correct };
    }
    return { chosenAnswer: undefined, isAnswerCorrect: false };
  }, [currentQuestion, answeredQuestions]);

  const onAnswerChosen = (answer) => {
    if (chosenAnswer) return;
    const current = questions[currentQuestion];
    const correctAnswer = current.correct_answer;
    setAnsweredQuestions((prev) => [
      ...prev,
      {
        questionIndex: currentQuestion,
        answer,
        correct: correctAnswer === answer,
      },
    ]);
  };

  const onNextQuestionClicked = useCallback(() => {
    if (currentQuestion - 1 < questions.length) {
      const newIndex = currentQuestion + 1;
      setCurrentQuestion(newIndex);
      onQuestionChanged((newIndex / questions.length) * 100);
    }
  }, [questions, currentQuestion, onQuestionChanged]);

  const currentScore = useMemo(() => {
    if (answeredQuestions.length === 0) return 0;
    const correctAnswers = answeredQuestions.filter((q) => q.correct);
    return Math.round((correctAnswers.length / answeredQuestions.length) * 100);
  }, [answeredQuestions]);

  const lowestScore = useMemo(() => {
    if (answeredQuestions.length === 0) return 0;
    const correctAnswers = answeredQuestions.filter((q) => q.correct);
    return Math.round((correctAnswers.length / questions.length) * 100);
  }, [answeredQuestions, questions]);

  const maxScore = useMemo(() => {
    if (answeredQuestions.length === 0) return 0;
    const correctAnswers = answeredQuestions.filter((q) => q.correct);
    const maxScore = Math.round(
      ((correctAnswers.length + (questions.length - answeredQuestions.length)) /
        questions.length) *
        100
    );
    return maxScore > 100 ? 100 : maxScore;
  }, [answeredQuestions, questions]);

  const notLastQuestion = useMemo(
    () => answeredQuestions.length < questions.length,
    [answeredQuestions, questions]
  );

  return (
    <div
      className="d-flex justify-content-center flex-column"
      style={{
        maxWidth: "800px",
      }}
    >
      <h1 className="mt-4">
        Question {currentQuestionIndex} of {totalQuestions}
      </h1>
      <span className="category" style={{ color: "gray" }}>
        {decodeURIComponent(category)}
      </span>
      <DifficultyComponent difficulty={difficulty} />
      <div className="mt-5">
        <QuestionComponent
          {...questions[currentQuestion]}
          onAnswerClicked={onAnswerChosen}
          chosenAnswer={chosenAnswer}
        />
      </div>
      {chosenAnswer && (
        <div className="d-flex align-items-center flex-column">
          <h1 className="text-center">
            {isAnswerCorrect ? "Correct!" : "Sorry!"}
          </h1>
          {notLastQuestion && (
            <NextQuestionButton onClick={onNextQuestionClicked}>
              Next Question
            </NextQuestionButton>
          )}
        </div>
      )}
      <div
        style={{ width: "100%" }}
        className="d-flex justify-content-center mt-5 flex-column align-items-center"
      >
        <div
          className="d-flex justify-content-between mb-1"
          style={{ width: "400px" }}
        >
          <span>Score: {currentScore}%</span>
          {notLastQuestion && <span>Max Score: {maxScore}%</span>}
        </div>
        <ProgressBarsContainer>
          <CustomProgressBar
            progress={currentScore}
            color={colors.darkGray}
            height={38}
            zIndex={2}
          />
          {notLastQuestion && (
            <>
              <CustomProgressBar
                progress={maxScore}
                color={colors.lightGray}
                height={38}
                zIndex={1}
              />
              <CustomProgressBar
                progress={lowestScore}
                color={colors.black}
                height={38}
                zIndex={3}
              />
            </>
          )}
        </ProgressBarsContainer>
      </div>
    </div>
  );
};
