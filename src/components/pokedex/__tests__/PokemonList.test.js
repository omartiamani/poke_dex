import React from "react";
import PokemonList from "../PokemonList";
import { shallow } from "enzyme";

it("renders correctly", () => {
  const pokemonList = [
    {
      id: 0,
      name: "Pikachu",
      type: "Foudre",
      description: "Pokemon au teint jaune"
    },
    {
      id: 1,
      name: "Bulbizard",
      type: "Plante",
      description: "Pokemon au teint vert"
    },
    {
      id: 2,
      name: "Salameche",
      type: "Feu",
      description: "Pokemon au teint rouge"
    }
  ];
  const component = shallow(<PokemonList pokemonList={pokemonList} />);

  expect(component).toMatchSnapshot();
});
