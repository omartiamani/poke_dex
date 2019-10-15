import { capitalize } from "./utils";

it("Tests capitalize function", () => {
  const stringMin = "foo";
  expect(capitalize(stringMin)).toEqual("Foo");

  const stringMaj = "FOO";
  expect(capitalize(stringMaj)).toEqual("FOO");

  const stringCap = "Foo";
  expect(capitalize(stringCap)).toEqual("Foo");
});
