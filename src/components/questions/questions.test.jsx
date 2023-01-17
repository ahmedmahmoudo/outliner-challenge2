import { render, fireEvent } from "@testing-library/react";
import { QuestionsComponent } from "./index";

const questions = [
  {
    category: "Entertainment%3A%20Video%20Games",
    type: "multiple",
    difficulty: "hard",
    question:
      "What%20was%20the%20name%20of%20the%20hero%20in%20the%2080s%20animated%20video%20game%20%27Dragon%27s%20Lair%27%3F",
    correct_answer: "Dirk%20the%20Daring",
    incorrect_answers: ["Arthur", "Sir%20Toby%20Belch", "Guy%20of%20Gisbourne"],
  },
  {
    category: "Animals",
    type: "multiple",
    difficulty: "easy",
    question:
      "What%20is%20the%20scientific%20name%20for%20modern%20day%20humans%3F",
    correct_answer: "Homo%20Sapiens",
    incorrect_answers: [
      "Homo%20Ergaster",
      "Homo%20Erectus",
      "Homo%20Neanderthalensis",
    ],
  },
];

const onQuestionChanged = jest.fn((progress) => progress);

describe("Questions component", () => {
  let screen;
  beforeEach(() => {
    screen = render(
      <QuestionsComponent
        questions={questions}
        onQuestionChanged={onQuestionChanged}
      />
    );
  });

  describe("showing all answers correctly", () => {
    it("should display questions and scores", () => {
      expect(screen.getByText(/Question 1 of 2/)).toBeVisible();
      expect(screen.getByText("Score: 0%")).toBeVisible();
      expect(screen.getByText("Max Score: 0%")).toBeVisible();
    });

    it("should show correct when correct answer is chosen", () => {
      fireEvent.click(screen.getByText(/Dirk the Daring/));
      expect(screen.getByText(/Correct!/)).toBeVisible();
    });

    it("should show button to go to next question", () => {
      fireEvent.click(screen.getByText(/Dirk the Daring/));
      expect(screen.getByText(/Next Question/)).toBeVisible();
    });

    it("should show score of 100% and max score of 100%", () => {
      fireEvent.click(screen.getByText(/Dirk the Daring/));
      expect(screen.getByText("Score: 100%")).toBeVisible();
      expect(screen.getByText("Max Score: 100%")).toBeVisible();
    });

    it("after selecting all questions correctly should show score of 100% and no max score", () => {
      fireEvent.click(screen.getByText(/Dirk the Daring/));
      fireEvent.click(screen.getByText(/Next Question/));
      fireEvent.click(screen.getByText(/Homo Sapiens/));
      expect(screen.getByText("Score: 100%")).toBeVisible();
      expect(screen.getByText(/Correct!/)).toBeVisible();
    });
  });

  describe("Selecting only half the answers correctly", () => {
    it("should show correct when correct answer is chosen", () => {
      fireEvent.click(screen.getByText(/Dirk the Daring/));
      expect(screen.getByText(/Correct!/)).toBeVisible();
    });

    it("should show button to go to next question", () => {
      fireEvent.click(screen.getByText(/Dirk the Daring/));
      expect(screen.getByText(/Next Question/)).toBeVisible();
    });

    it("should show score of 100% and max score of 100%", () => {
      fireEvent.click(screen.getByText(/Dirk the Daring/));
      expect(screen.getByText("Score: 100%")).toBeVisible();
      expect(screen.getByText("Max Score: 100%")).toBeVisible();
    });

    it("after selecting all questions correctly should show score of 100% and no max score", () => {
      fireEvent.click(screen.getByText(/Dirk the Daring/));
      fireEvent.click(screen.getByText(/Next Question/));
      fireEvent.click(screen.getByText(/Homo Erectus/));
      expect(screen.getByText("Score: 50%")).toBeVisible();
      expect(screen.getByText(/Sorry!/)).toBeVisible();
    });
  });

  describe("selecting all answers wrong", () => {
    it("should show sorry when wrong answer is chosen", () => {
      fireEvent.click(screen.getByText(/Arthur/));
      expect(screen.getByText(/Sorry!/)).toBeVisible();
      expect(screen.getByText("Score: 0%")).toBeVisible();
    });

    it("after selecting all questions wrong should show score of 0% and no max score", () => {
      fireEvent.click(screen.getByText(/Arthur/));
      fireEvent.click(screen.getByText(/Next Question/));
      fireEvent.click(screen.getByText(/Homo Erectus/));
      expect(screen.getByText("Score: 0%")).toBeVisible();
      expect(screen.getByText(/Sorry!/)).toBeVisible();
    });
  });
});
