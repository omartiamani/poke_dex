import React from "react";
import PokemonCard from "../PokemonCard";
import { shallow } from "enzyme";

it("renders correctly", () => {
  const component = shallow(<PokemonCard />);

  expect(component).toMatchSnapshot();
});
