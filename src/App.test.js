import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { shallow, mount } from "enzyme";
import { Provider } from "mobx-react";
import rootStore from "./store/RootStore";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders correctly", () => {
  const component = mount(
    <Provider rootStore={rootStore}>
      <App />{" "}
    </Provider>
  );

  expect(component).toMatchSnapshot();
  expect(component.find("AddForm")).toHaveLength(1);
  expect(component.find("PokemonList")).toHaveLength(1);
});
