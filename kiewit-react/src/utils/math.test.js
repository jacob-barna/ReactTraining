import { add } from "./math";

it("should return 3 when passed 1 and 2", () => {
  //arrange

  //act
  const result = add(2, 1);

  //assert
  expect(result).toBe(3);
});
