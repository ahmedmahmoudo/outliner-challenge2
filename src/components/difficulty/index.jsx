import { AiFillStar, AiOutlineStar } from "react-icons/ai";

export const DifficultyComponent = (props) => {
  const { difficulty } = props;

  return (
    <div className="d-flex">
      <AiFillStar size={20} />
      {difficulty === "medium" || difficulty === "hard" ? (
        <AiFillStar size={20} />
      ) : (
        <AiOutlineStar size={20} />
      )}
      {difficulty === "hard" ? (
        <AiFillStar size={20} />
      ) : (
        <AiOutlineStar size={20} />
      )}
    </div>
  );
};
