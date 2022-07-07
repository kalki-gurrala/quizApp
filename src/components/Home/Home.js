import React, { useContext } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { scoreContext } from "./Context";

function Home() {
  const [score] = useContext(scoreContext);
  return (
    <div className="homePage">
      <h1>Welcome To Quiz Club</h1>
      <h3>Your Score is : {score}/ 20</h3>
      <div className="startPage">
        <div className="leftContent">
          <h1>No of Questions : 20</h1>
          <Link to="/leftQuiz">
            <button className="btn_left">Let's Start Left Quiz</button>
          </Link>
        </div>
        <div className="rightContent">
          <h1>No of Questions : 20</h1>
          <Link to="/rightQuiz">
            <button className="btn_right">Let's Start Right Quiz</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
