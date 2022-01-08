import React from "react";
import Navbar from "./Navbar";
import { shallow } from "enzyme/build";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });
//2ways of checking length
test("checking ul tags", () => {
  const wrapper = shallow(<Navbar />);
  expect(wrapper.find("ul").length).toBe(1);
});
test("checking li tags", () => {
  const wrapper = shallow(<Navbar />);
  expect(wrapper.find("li")).toHaveLength(4);
});
test("checking ul tags", () => {
  const wrapper = shallow(<Navbar />);
  expect(wrapper.find("ul").children().length).toBe(4);
  // console.log(wrapper.debug());
});
test("ul tag exists", () => {
  const ultag = shallow(<Navbar />);
  expect(ultag.find("ul").exists()).toBe(true);
});
test("ul tag exists2", () => {
  const ultag = shallow(<Navbar />);
  expect(ultag.find("ul").exists()).toEqual(true);
});
