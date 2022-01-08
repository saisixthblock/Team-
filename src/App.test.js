import React from "react";
import App from "./App";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { shallow } from "enzyme/build";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });
test("app navigating", () => {
  render(<App />);
  // expect(screen.getByText(/home page/i)).toBeInTheDocument();
});
