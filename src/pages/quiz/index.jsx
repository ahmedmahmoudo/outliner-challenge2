import { ProgressBarComponent } from "../../components/progressBar";
import colors from "../../constants/colors";
import React, { useState } from "react";
import * as questions from "../../questions.json";
import { QuestionsComponent } from "../../components/questions";

export const QuizPage = () => {
  const [progress, setProgress] = useState(0);
  const [score, setScore] = useState(0);

  const onScoreChanged = (correct) => {};

  return (
    <div className="container">
      <ProgressBarComponent
        progress={progress}
        color={colors.darkGray}
        height={20}
      />
      <QuestionsComponent
        questions={questions}
        onQuestionChanged={setProgress}
        onScoreChanged={onScoreChanged}
      />
    </div>
  );
};
