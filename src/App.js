import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import Profile from "./Profile";
import About from "./About";
import Contact from "./Contact";
import Hyderabad from "./Hyderabad";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Profile" element={<Profile />}></Route>
          <Route path="/About" element={<About />}></Route>
          <Route path="/Contact" element={<Contact />}></Route>
          <Route path="/hyderabad" element={<Hyderabad />}></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
