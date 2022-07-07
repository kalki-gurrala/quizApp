import "./App.css";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LeftQuiz from "./components/LeftQuizs/LeftQuiz";
import RightQuiz from "./components/RightQuizs/RightQuiz";
import Context from "./components/Home/Context";

function App() {
  return (
    <Context>
      <div className="App">
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/leftQuiz" element={<LeftQuiz />} />
            <Route exact path="/rightQuiz" element={<RightQuiz />} />
          </Routes>
        </Router>
      </div>
    </Context>
  );
}

export default App;
