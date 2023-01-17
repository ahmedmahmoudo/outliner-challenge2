import { render, fireEvent } from "@testing-library/react";
import { QuestionComponent } from "./index";

const onAnswerClicked = jest.fn((answer) => answer);

describe("Question Component", () => {
  const questionProps = {
    question: "Just%20a%20question%20to%20render",
    correctAnswer: "Yes%20That's%20Me",
    incorrectAnswers: ["Not%20Me", "Or%20Me", "Neither%20Me"],
    chosenAnswer: undefined,
    onAnswerClicked,
  };

  describe("Without an answer selected", () => {
    let getByText;
    let container;
    beforeEach(() => {
      const screen = render(<QuestionComponent {...questionProps} />);
      getByText = screen.getByText;
      container = screen.container;
    });
    it("renders the question and all answers", () => {
      expect(getByText(/Just a question to render/)).toBeVisible();
      expect(getByText(/Yes That's Me/)).toBeVisible();
      expect(getByText(/Not Me/)).toBeVisible();
      expect(getByText(/Or Me/)).toBeVisible();
      expect(getByText(/Neither Me/)).toBeVisible();
    });
    it("answers are clickable and calls function", () => {
      fireEvent.click(getByText(/Yes That's Me/));
      expect(onAnswerClicked).toBeCalledWith("Yes%20That's%20Me");
    });

    it("only 4 buttons are rendered since we provided 4 answers", () => {
      expect(container.querySelectorAll("button")).toHaveLength(4);
    });
  });

  describe("When an answer is selected", () => {
    let getByText;
    beforeEach(() => {
      const screen = render(
        <QuestionComponent
          {...questionProps}
          chosenAnswer={"Yes%20That's%20Me"}
        />
      );
      getByText = screen.getByText;
    });

    it("can not click on any button", () => {
      fireEvent.click(getByText(/Yes That's Me/));
      expect(onAnswerClicked).not.toBeCalledWith("Yes%20That's%20Me");
    });

    it("all buttons are disabled", () => {
      expect(getByText(/Yes That's Me/)).toBeDisabled();
      expect(getByText(/Not Me/)).toBeDisabled();
      expect(getByText(/Or Me/)).toBeDisabled();
      expect(getByText(/Neither Me/)).toBeDisabled();
    });
  });
});
