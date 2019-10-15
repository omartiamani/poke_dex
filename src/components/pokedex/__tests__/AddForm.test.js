import React from "react";
import AddForm from "../AddForm";
import { shallow, mount } from "enzyme";
import { Provider } from "mobx-react";
import rootStore from "../../../store/RootStore";

it("renders correctly", () => {
  const component = shallow(<AddForm />);

  expect(component).toMatchSnapshot();
});
