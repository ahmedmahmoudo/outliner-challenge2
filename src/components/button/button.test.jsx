import { render, fireEvent } from "@testing-library/react";
import { Button } from "./index";

const mockOnClick = jest.fn();

describe("Button Component", () => {
  it("will call the function on click", () => {
    const { getByText } = render(
      <Button onClick={mockOnClick}>Click Me</Button>
    );

    fireEvent.click(getByText(/Click Me/));

    expect(mockOnClick).toBeCalled();
  });

  it("will not be clickable since it's disabled", () => {
    const { getByText } = render(
      <Button onClick={mockOnClick} disabled>
        Click Me
      </Button>
    );

    fireEvent.click(getByText(/Click Me/));

    expect(mockOnClick).not.toBeCalled();
  });

  it("will not do anything if no onClick provided", () => {
    const { getByText } = render(<Button onClick={() => {}}>Click Me</Button>);

    fireEvent.click(getByText(/Click Me/));

    expect(mockOnClick).not.toBeCalled();
  });
});
