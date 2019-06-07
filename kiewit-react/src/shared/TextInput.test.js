import React from "react";
import { render, cleanup } from "@testing-library/react";
import TextInput from "./TextInput";

afterEach(cleanup);

it("should display anerror message when passed an error", () => {
  const error = "error";

  const { debug, getByText } = render(
    <TextInput
      error={error}
      value=""
      name=""
      label=""
      id=""
      onChange={jest.fn()}
    />
  );

  getByText(error);
});

it("should not display an error message when an error is not passed", () => {
  const { debug, queryByRole } = render(
    <TextInput value="" name="" label="" id="" onChange={jest.fn()} />
  );

  expect(queryByRole("alert")).toBeNull();
});
