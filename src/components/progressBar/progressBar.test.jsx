import { render } from "@testing-library/react";
import colors from "../../constants/colors";
import { ProgressBarComponent } from "./index";

describe("ProgressBar Component", () => {
  it("renders with the width and color and height set", () => {
    const { getByTestId } = render(
      <ProgressBarComponent progress={45} color={colors.darkGray} height={20} />
    );

    expect(getByTestId("progress-bar")).toHaveStyle({
      width: "45%",
      "background-color": colors.darkGray,
      height: "20px",
    });
  });

  it("renders without a height and not show", () => {
    const { getByTestId } = render(
      <ProgressBarComponent progress={45} color={colors.darkGray} />
    );

    expect(getByTestId("progress-bar")).not.toHaveStyle({
      height: "20px",
    });
  });
});
