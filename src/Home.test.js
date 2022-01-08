import React from "react";
import { shallow } from "enzyme/build";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Home from "./Home";

configure({ adapter: new Adapter() });
configure({ disableLifecycleMethods: true });
test("classcomponent", () => {
  const home = shallow(<Home />, { disableLifecycleMethods: true });
  expect(home.find("form").length).toBe(1);
});
test("classcomponent", () => {
  const home = shallow(<Home />, { disableLifecycleMethods: true });
  expect(home.find("input").length).toBe(6);
});
test("classcomponent", () => {
  const home = shallow(<Home />, { disableLifecycleMethods: true });
  home.simulate("change", { target: { value: "", name: "email" } });
  expect(home.find("#email").props().value).toEqual("");
});
test("submitchecking", () => {
  const fakeEvent = {
    preventDefault: () => {
      name: "";
      email: "";
    },
  };
  const submit1 = shallow(<Home />, { disableLifecycleMethods: true });
  expect(submit1.find("#form").length).toBe(1);
  submit1.find("#form").simulate("click", fakeEvent);
  expect(submit1.find("input").length).toBe(6);
});
