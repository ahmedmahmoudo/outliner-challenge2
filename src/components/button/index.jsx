import classNames from "classnames";

export const Button = (props) => {
  const { onClick, children, disabled, className, style } = props;

  const onButtonClicked = (e) => {
    e.preventDefault();
    onClick();
  };

  return (
    <button
      className={classNames("btn btn-primary", className)}
      style={style}
      onClick={onButtonClicked}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
