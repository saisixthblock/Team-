import React from "react";
import { shallow } from "enzyme/build";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Clstest from "./Clstest";

configure({ adapter: new Adapter() });
// configure({ disableLifecycleMethods: false });
test("classcomponent", () => {
  const clstest = shallow(<Clstest />, { disableLifecycleMethods: false });
  expect(clstest.find("div").text()).toBe("class component testing:welcome");
});
