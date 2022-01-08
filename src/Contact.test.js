import React from "react";
import Contact from "./Contact";
import { shallow } from "enzyme/build";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });
test("checking div tag", () => {
  const wrapper = shallow(<Contact />);
  // expect(wrapper.find("div").text()).toContain("contact page");
});
