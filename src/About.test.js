import React from "react";
import About from "./About";
import { shallow } from "enzyme/build";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });
test("checking div tag", () => {
  const wrapper = shallow(<About />);
  expect(wrapper.find("div").text()).toContain("About page");
});
