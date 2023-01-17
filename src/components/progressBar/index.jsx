import React from "react";

export const ProgressBarComponent = (props) => {
  const { progress, color, style, height = "40px", className } = props;

  return (
    <div
      style={{
        width: progress + "%",
        backgroundColor: color,
        height,
        ...style,
      }}
      data-testid="progress-bar"
      className={className}
    ></div>
  );
};
