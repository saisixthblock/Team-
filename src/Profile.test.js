import React from "react";
import Profile from "./Profile";
import Propc from "./Propc";
import { shallow } from "enzyme/build";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";
configure({ adapter: new Adapter() });
test("checking h1 tag", () => {
  const wrapper = shallow(<Profile />);
  expect(wrapper.find("h1").text()).toContain("count:5");
});
test("checking button tag", () => {
  const wrapper = shallow(<Profile />);
  wrapper.find("button").simulate("click");
  expect(wrapper.find("h1").text()).toBe("count:10");
});
test("checking props", () => {
  const wrapper = shallow(<Profile />);
  expect(wrapper.find(Propc).prop("counts")).toBe(5);
});
test("checking props1", () => {
  const tree = shallow(<Profile />);
  expect(toJson(tree)).toMatchSnapshot();
});
